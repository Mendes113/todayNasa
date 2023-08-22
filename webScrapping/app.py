import requests
import shutil

def main():
    url = "https://api.nasa.gov/planetary/apod"
    api_key = "gYVt2DldOL5QrQ4pKOEjO9afEAD7hXNwY2OrDeV2"
    
    params = {
        'api_key': api_key
    }
    
    response = requests.get(url, params=params)
    
    if response.status_code == 200:
        apod_data = response.json()
        media_type = apod_data.get("media_type")
        
        if media_type == "image":
            image_url = apod_data["url"]
            image_name = image_url.split("/")[-1]
            
            image_response = requests.get(image_url, stream=True)
            
            if image_response.status_code == 200:
                with open(image_name, "wb") as image_file:
                    shutil.copyfileobj(image_response.raw, image_file)
                print("Imagem salva com sucesso")
            else:
                print("Erro ao baixar a imagem")
        else:
            print("O tipo de mídia não é uma imagem")
    else:
        print("Erro ao fazer a requisição")

if __name__ == "__main__":
    main()
