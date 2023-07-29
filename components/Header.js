/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react';
import { useRouter } from 'next/router';
import styles from './Header.module.css';

const Header = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <nav className="navbar">
        <div className="container">
          <div className={styles.menuContainer}>
            {/* Opciones al extremo izquierdo */}
            <ul className={styles.navbarNav}>
              <li className={styles.navItem}>
                <a
                  href="/home"
                  className={`nav-link ${
                    router.pathname === '/home' ? styles.active : ''
                  }`}
                  style={{ textDecoration: 'none', color: 'white'}}
                >
                  Inicio
                </a>
              </li>
              <li className={styles.navItem}>
                <a
                  href="/services"
                  className={`nav-link ${
                    router.pathname === '/services' ? styles.active : ''
                  }`}
                  style={{ textDecoration: 'none', color: 'white'}}
                >
                  Servicios Digitales
                </a>
              </li>
              <li className={styles.navItem}>
                <a
                  href="/testimonios"
                  className={`nav-link ${
                    router.pathname === '/testimonios' ? styles.active : ''
                  }`}
                  style={{ textDecoration: 'none', color: 'white'}}
                >
                  Testimonios
                </a>
              </li>
            </ul>
            {/* Opciones al extremo derecho */}
            <ul className={`${styles.navbarNav} ${styles.rightLinksContainer}`}>
              <li className={styles.navItem}>
                <a
                  href="/users"
                  className={`nav-link ${
                    router.pathname === '/users' ? styles.active : ''
                  }`}
                  style={{ textDecoration: 'none', color: 'white'}}
                >
                  Registrarse
                </a>
              </li>
              <li className={styles.navItem}>
                <a
                  href="/login"
                  className={`nav-link ${
                    router.pathname === '/login' ? styles.active : ''
                  }`}
                  style={{ textDecoration: 'none', color: 'white'}}
                >
                  Iniciar Sesión
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
