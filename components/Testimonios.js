// components/Testimonios.js
import React from 'react';
import styles from './Testimonios.module.css';

const Testimonios = () => {
  const testimoniosData = [
    {
      id: 1,
      nombre: 'John Doe',
      testimonio:
        '¡Increíble! Gracias a este servicio, mi vida ha cambiado por completo. Ahora puedo disfrutar de mis actividades favoritas sin preocupaciones.',
    },
    {
      id: 2,
      nombre: 'Jane Smith',
      testimonio:
        'No puedo creer lo fácil que fue resolver mi problema con este servicio. El equipo de soporte fue extremadamente amable y me ayudó en todo momento.',
    },
    {
      id: 3,
      nombre: 'David Johnson',
      testimonio:
        '¡Altamente recomendado! Este servicio superó mis expectativas. Nunca había tenido una experiencia tan satisfactoria antes.',
    },
    {
      id: 4,
      nombre: 'Laura Rodriguez',
      testimonio:
        'Estoy muy impresionada con la calidad y eficiencia de este servicio. Sin duda, lo volveré a utilizar en el futuro.',
    },
    {
      id: 5,
      nombre: 'Carlos Gomez',
      testimonio:
        'No puedo expresar lo agradecido que estoy con este servicio. Ha sido una verdadera bendición para mí y mi familia.',
    },
    {
        id: 6,
        nombre: 'María Sánchez',
        testimonio:
          'Gracias a esta plataforma, ahora tengo el internet más rápido que he tenido en mi vida. ¡Altamente recomendado!',

    },
    // Puedes agregar más testimonios aquí
  ];

  return (
    <div className={styles.serviceCardContainer}>
      {testimoniosData.map((testimonio) => (
        <div key={testimonio.id} className={styles.serviceCard}>
          <h3 className={styles.nombre}>{testimonio.nombre}</h3>
          <p className={styles.testimonio}>{testimonio.testimonio}</p>
        </div>
      ))}
    </div>
  );
};

export default Testimonios;
