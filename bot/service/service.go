package service

import (
	"encoding/json"
	"io"
	"log"
	"net/http"
	"os"
	"path/filepath"
)



func GetApiImg(url string, token string) string{
	log.Println("Getting image from " + url)
	response, err := makeRequest(url, map[string]string{
		"api_key": token,
	})
	if err != nil {
		log.Fatal(err)
	}
	defer response.Body.Close()

	body, err := decodeJSON(response.Body)
	if err != nil {
		log.Fatal(err)
	}

	imageUrl := body["url"].(string)
	response, err = makeRequest(imageUrl, map[string]string{})
	if err != nil {
		log.Fatal(err)
	}
	defer response.Body.Close()

	title := body["title"].(string)
	saveImage(response.Body, title + ".jpg")
	
	return title
}

func GetImgExplanation(url string, token string) (string, error) {
	response, err := makeRequest(url, map[string]string{
		"api_key": token,
	})
	if err != nil {
		return "", err
	}
	defer response.Body.Close()

	body, err := decodeJSON(response.Body)
	if err != nil {
		return "", err
	}

	explanation := body["explanation"].(string)
	log.Println(explanation)

	return explanation, nil
}

func makeRequest(url string, params map[string]string) (*http.Response, error) {
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}

	query := req.URL.Query()
	for key, value := range params {
		query.Add(key, value)
	}

	req.URL.RawQuery = query.Encode()

	client := &http.Client{}
	response, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	return response, nil
}

func decodeJSON(body io.Reader) (map[string]interface{}, error) {
	decoder := json.NewDecoder(body)
	var result map[string]interface{}
	err := decoder.Decode(&result)
	return result, err
}
func saveImage(body io.Reader, fileName string) error {
	log.Println("Saving image to " + fileName)
	if _, err := os.Stat(fileName); err == nil {
		return nil
	}

	imageFile, err := os.Create(fileName)
	if err != nil {
		return err
	}
	defer imageFile.Close()

	// Save the image to the file
	_, err = io.Copy(imageFile, body)
	if err != nil {
		return err
	}



	return nil
}

func DeleteJpgs() {
	// Specify the folder where you want to delete .jpg files (root folder in this case)
	folder := "."
	otherfolder := ".."

	err := filepath.Walk(folder, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}
		if path == otherfolder {
			return nil
		}
		
		// Check if the file is a .jpg file
		if filepath.Ext(path) == ".jpg" {
			// Attempt to remove the file
			err = os.Remove(path)
			if err != nil {
				log.Fatal(err)
			}
		}
		return nil
	})

	if err != nil {
		log.Fatal(err)
	}
}
