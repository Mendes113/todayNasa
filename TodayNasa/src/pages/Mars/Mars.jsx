import React, { useEffect, useState, useRef } from 'react';

import styles from './Mars.module.css';

const Mars = () => {
  const [roverImages, setRoverImages] = useState([]);
  const exampleRef = useRef(null);

  useEffect(() => {
    fetchRoverImages();
  }, []);

  function fetchRoverImages() {
    const apiKey = 'gYVt2DldOL5QrQ4pKOEjO9afEAD7hXNwY2OrDeV2';
    const roverName = 'curiosity';
    const cameraNames = ['fhaz', 'rhaz', 'chemcam', 'mast', 'mardi', 'navcam', 'pancam', 'mahli'];

    Promise.all(
      cameraNames.map(cameraName =>
        fetch(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/latest_photos?api_key=${apiKey}&sol=1000&camera=${cameraName}`
        ).then(response => response.json())
      )
    )
      .then(dataArray => {
        const filteredImages = dataArray
          .map(data => data.latest_photos[0])
          .filter(image => image && !roverImages.some(existingImage => existingImage.camera.name === image.camera.name));

        setRoverImages(filteredImages);
      })
      .catch(error => {
        console.error('Error fetching rover images:', error);
      });
  }

  const scrollToImageSection = () => {
    exampleRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.content}>
        <h1 className={styles.title}>Today Rover</h1>
        <p className={styles.description}>Acompanhe as imagens do Rover Curiosity</p>
        <button className={styles.startButton} onClick={scrollToImageSection}>
          Ir para imagem do dia
        </button>
      </div>
      <div className={styles.exampleContainer} ref={exampleRef}>
        <h1 className={styles.titleExem}>Imagens do rover Curiosity</h1>
        <div className={styles.exampleImages}>
  {roverImages.reduce((rows, image, index) => {
    if (index % 2 === 0) {
      rows.push([image]);
    } else {
      rows[rows.length - 1].push(image);
    }
    return rows;
  }, []).map((row, rowIndex) => (
    <div className={styles.exampleRow} key={rowIndex}>
      {row.map((roverImage, imageIndex) => (
        <div className={styles.example} key={imageIndex}>
          <img
            src={roverImage.img_src}
            alt={`Imagem do rover Curiosity em Marte (${roverImage.camera.full_name})`}
            className={styles.exampleImage}
          />
          <h2 className={styles.exampleTitle}>{roverImage.rover.name}</h2>
          <p className={styles.exampleDescription}>
            Data: {roverImage.earth_date}
            <br />
            {roverImage.camera.full_name}
          </p>
        </div>
      ))}
    </div>
  ))}
</div>
      </div>
    </div>
  );
};

export default Mars;
