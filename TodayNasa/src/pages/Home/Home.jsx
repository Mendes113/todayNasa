import React, { useEffect, useState, useRef } from 'react';
import styles from './Home.module.css';
import ExemCorreto from '../../assets/example.jpg';

const Home = () => {
  const [apodData, setApodData] = useState(null);
  const exampleRef = useRef(null);

  useEffect(() => {
    getImgApi();
  }, []);

  function getImgApi() {
    const req = new XMLHttpRequest();
    const url = "https://api.nasa.gov/planetary/apod?api_key=";
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

  const scrollToImageSection = () => {
    exampleRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>Today Nasa</h1>
        <p className={styles.description}>
          Atualiazações todo dia de imagens da espaciais
        </p>
        <button className={styles.startButton} onClick={scrollToImageSection}>
          Ir para imagem do dia
        </button>
      </div>
      <div className={styles.exampleContainer} ref={exampleRef}>
        <h1 className={styles.titleExem}>Imagem do dia</h1>
        <div className={styles.exampleImages}>
          <div className={styles.example}>
            {apodData && (
              <>
                <img
                  src={apodData.hdurl}
                  alt="Imagem do dia da NASA"
                  className={styles.exampleImage}
                />
                <h2 className={styles.exampleTitle}>{apodData.title}</h2>
                <p className={styles.exampleDescription}>{apodData.explanation}</p>
              </>
            )}
            <a
              className={styles.startButton}
              download="imagem-do-dia.jpg"
              href={apodData && apodData.hdurl}
              style={{ display: apodData ? 'block' : 'none', marginTop: '30px' }}
            >
              View Source
            </a>
          </div>
          {/* ... outros exemplos ... */}
        </div>
      </div>
    </div>
  );
};

export default Home;
