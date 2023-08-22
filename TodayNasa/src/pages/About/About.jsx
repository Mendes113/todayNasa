import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

import styles from './About.module.css';

const About = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const exampleRef = useRef(null);

  const scrollToImageSection = () => {
    exampleRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      // Verifique a posição de rolagem e atualize o estado
      setIsScrolled(window.scrollY > 0);
    };

    // Adicione um listener para o evento de scroll
    window.addEventListener('scroll', handleScroll);

    // Remova o listener quando o componente for desmontado
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.backgroundContainer}>
        <div className={`${styles.backgroundImage} ${isScrolled ? styles.blurBackground : ''}`}></div>
      </div>
      <div className={styles.content}>
        <h1 className={styles.title}>Today Space</h1>
        <p className={styles.description}>
          Atualizações todos os dias de imagens espaciais
        </p>
       
      </div>
      <div className={styles.exampleContainer} ref={exampleRef}>
        <h1 className={styles.titleExem}>Sobre o projeto e Desenvolvedor</h1>
        <div className={styles.About}>
          <div className={styles.aboutDescription}>
            <p>
              Este é um projeto que está em processo de melhoria, o mesmo foi desenvolvido com o intuito de aprender e praticar ReactJS, CSS, JavaScript e APIs, servindo como um portfólio para o desenvolvedor.
            </p>
          </div>
        </div>
        <div className={styles.contact}>
          <h2 >Formas de Contato:</h2>
          <div className={styles.contactText}>
          Email para contato: <a href="mailto:andremendes0113@gmail.com" target="_blank"><FontAwesomeIcon icon={faEnvelope} /> Andremendes0113@gmail.com</a><br />
          </div>
       
        

        </div>
        {/* Resto do código */}
      </div>
    </div>
  );
};

export default About;
