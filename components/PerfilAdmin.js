import React, { useState, useEffect } from 'react';
import styles from './PerfilAdmin.module.css'; 

const PerfilAdmin = () => {
  const [userName, setUserName] = useState('');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Aquí puedes realizar una llamada a la API para obtener el nombre del usuario desde la base de datos
    // En este caso, utilizamos un valor de ejemplo
    setUserName('Administrador'); // Reemplaza esto con el nombre del usuario obtenido desde la base de datos

    // Obtener la fecha actual en el formato deseado
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    setCurrentDate(today.toLocaleDateString('es-ES', options));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.welcomeMessage}>
        Bienvenido {userName}
      </div>
      <div className={styles.date}>
        {currentDate}
      </div>
    </div>
  );
};

export default PerfilAdmin;
