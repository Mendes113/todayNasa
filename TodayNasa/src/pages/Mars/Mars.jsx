import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Mars.module.css';


const Mars = () => {
  const [apodData, setApodData] = useState(null);

  useEffect(() => {
    getImgApi();
  }, []);

  function getImgApi() {
    const req = new XMLHttpRequest();
    const url = "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=";
    const api_key = "gYVt2DldOL5QrQ4pKOEjO9afEAD7hXNwY2OrDeV2";

    req.open("GET", url + api_key);
    req.send();

    req.addEventListener("load", function () {
      if (req.status === 200 && req.readyState === 4) {
        const response = JSON.parse(req.responseText);
        setApodData(response);
      }
    });
  }

  return (
    <div className={styles.homeContainer}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>ChatBot</h1>
        <p className={styles.description}>Uma ferramenta de ensino de programação</p>
        <Link to="/chat" className={styles.startButton}>Iniciar</Link>
      </div>
      <div className={styles.exampleContainer}>
        <h1 className={styles.titleExem}>Imagem do dia</h1>
        <div className={styles.exampleImages}>
          <div className={styles.example}>
            {apodData && (
              <>
                <img src={apodData.hdurl} alt="Imagem do dia da NASA" className={styles.exampleImage} />
                <h2 className={styles.exampleTitle}>{apodData.title}</h2>
                <p className={styles.exampleDescription}>{apodData.explanation}</p>
              </>
            )}
          </div>
          {/* ... outros exemplos ... */}
        </div>
      </div>
    </div>
  );
};

export default Mars;
