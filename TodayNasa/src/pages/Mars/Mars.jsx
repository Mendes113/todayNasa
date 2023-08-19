import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Mars.module.css';

const Mars = () => {
  const [roverImage, setRoverImage] = useState(null);

  useEffect(() => {
    fetchRoverImage();
  }, []);

  function fetchRoverImage() {
    const apiKey = 'gYVt2DldOL5QrQ4pKOEjO9afEAD7hXNwY2OrDeV2';
    const roverName = 'curiosity';

    fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/latest_photos?api_key=${apiKey}`)
      .then(response => response.json())
      .then(data => {
        if (data.latest_photos && data.latest_photos.length > 0) {
          setRoverImage(data.latest_photos[0]);
        }
      })
      .catch(error => {
        console.error('Error fetching rover image:', error);
      });
  }

  return (
    <div className={styles.homeContainer}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>Today Nasa</h1>
        <p className={styles.description}>Atualiazações todo dia de imagens da espaciais</p>
         <Link to="/chat" className={styles.startButton} >Ir para imagem do dia</Link>
      </div>
      <div className={styles.exampleContainer}>
        <h1 className={styles.titleExem}>Imagem do rover Curiosity</h1>
        <div className={styles.exampleImages}>
          <div className={styles.example}>
            {roverImage && (
              <>
                <img
                  src={roverImage.img_src}
                  alt="Imagem do rover Curiosity em Marte"
                  className={styles.exampleImage}
                />
                <h2 className={styles.exampleTitle}>{roverImage.rover.name}</h2>
                <p className={styles.exampleDescription}>
                  Data: {roverImage.earth_date}
                </p>
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
