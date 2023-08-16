export function ApodImg() {
    const req = new XMLHttpRequest();
    const url = "https://api.nasa.gov/planetary/apod?api_key=";
    const api_key = "gYVt2DldOL5QrQ4pKOEjO9afEAD7hXNwY2OrDeV2";
  
    req.open("GET", url + api_key);
    req.send();
  
    req.addEventListener("load", function () {
      if (req.status === 200 && req.readyState === 4) {
        const response = JSON.parse(req.responseText);
        const titleElement = document.getElementById("title");
        const dateElement = document.getElementById("date");
        const picElement = document.getElementById("pic");
        const explanationElement = document.getElementById("explanation");
  
        if (titleElement) titleElement.textContent = response.title;
        if (dateElement) dateElement.textContent = response.date;
        if (picElement) picElement.setAttribute("src", response.hdurl);
        if (explanationElement) explanationElement.textContent = response.explanation;
      }
    });
  }
  