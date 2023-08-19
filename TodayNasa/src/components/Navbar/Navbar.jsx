import { NavLink } from "react-router-dom"

import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
        <NavLink to="/" className={styles.brand}>
            Today <span> Nasa    </span>
        </NavLink>
        <ul className={styles.links_list}>
            <li>
                <NavLink to="/" className={({isActive}) => (isActive ? styles.active : '')}>Home</NavLink>
            </li>
            {/* <li>
                <NavLink to="/space" className={({isActive}) => (isActive ? styles.active : '')}>Space</NavLink>
            </li> */}
            <li>
                <NavLink to="/mars" className={({isActive}) => (isActive ? styles.active : '')}>Mars</NavLink>
            </li>
           
        </ul>
       
    </nav>
  )
}

export default Navbar