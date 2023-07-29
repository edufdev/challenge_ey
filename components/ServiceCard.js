import React from 'react';
import { useRouter } from 'next/router'; // Importar useRouter
import styles from './ServiceCard.module.css';

const ServiceCard = ({ name, description, price, benefits }) => {
  const router = useRouter(); // Crear instancia de useRouter

  const handleBuyClick = () => {
    router.push('/users'); // Redireccionar a la página de registro al hacer clic en "Comprar"
  };

  return (
    <div className={styles.card}>
      <h3>{name}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.price}>
        <p>Precio:</p>
        <p className={styles.priceValue}>{price}</p>
      </div>
      <div className={`${styles.benefits} ${styles.leftAlignedBenefits}`}>
        <p>Beneficios:</p>
        <ul>
          {benefits.map((benefit, index) => (
            <li key={index}>{benefit}</li>
          ))}
        </ul>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.ctaButton} onClick={handleBuyClick}>
          Solicitar Servicios
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;