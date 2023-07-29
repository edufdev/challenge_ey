/* eslint-disable @next/next/no-html-link-for-pages */ 
import React from 'react';
import { useRouter } from 'next/router';
import styles from './HeaderAdmin.module.css';

const HeaderAdmin = () => {
    const router = useRouter();

  return (
    <header className={styles.header}>
      <nav className="navbar">
        <div className="container">
          <div className={styles.menuContainer}>
            {/* Opciones al extremo derecho */}
            <ul className={`${styles.navbarNav} ${styles.rightLinksContainer}`}>
              <li className={styles.navItem}>
                <a
                  href="/configuracion-admin"
                  className={`nav-link ${
                    router.pathname === '/configuracion-admin' ? styles.active : ''
                  }`}
                  style={{ textDecoration: 'none', color: 'white'}}
                >
                  Perfil
                </a>
              </li>
              <li className={styles.navItem}>
                <a
                  href="/home"
                  className={`nav-link ${
                    router.pathname === '/home' ? styles.active : ''
                  }`}
                  style={{ textDecoration: 'none', color: 'white'}}
                >
                  Cerrar Sesión
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderAdmin;
