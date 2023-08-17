import React from 'react'
import { NavLink } from "react-router-dom"

// CSS
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
          Today <span>Nasa</span>
        </NavLink>
        <ul className={styles.links_list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              Sobre
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? styles.active : '')}
            >
              Contato
            </NavLink>
          </li>
        </ul>
      </div>
      <div className={styles.footerContent}>
        <h4>TodayNasa, imagens novas disponibilizadas pela NASA</h4>
        <p>TodayNasa &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  )
}

export default Footer