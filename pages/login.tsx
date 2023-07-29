import React from 'react';
import LoginComponent from '../components/LoginComponent';
import Layout from '../components/Layout';
import styles from './loginpage.module.css'; // Importa el archivo de estilos

const LoginPage = () => {
  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.form}>
          <h1>Iniciar Sesión</h1>
          <LoginComponent />
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
