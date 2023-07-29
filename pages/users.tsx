import React from 'react';
import Layout from '../components/Layout';
import UserModuleComponent from '../components/UserModuleComponent';
import styles from './UsersPage.module.css'; // Importa el archivo de estilos

const UsersPage: React.FC = () => {
  return (
    <Layout>
      <main>
        <div className={`${styles.welcomeMessage} ${styles.centeredTitle}`}>
          <h1>Estás a punto de cambiar tu perspectiva digital</h1>
          <p className={styles.subTitle}>
            Ingresa tus datos para poder empezar con el proceso de contratación de servicio.
          </p>
        </div>
        <UserModuleComponent />
      </main>
    </Layout>
  );
};

export default UsersPage;