import React, { useEffect, useState } from 'react';
import ServiceCard from '../components/ServiceCard';
import Layout from '../components/Layout';
import styles from './ServicesPage.module.css';

// Definir el tipo de interfaz para los datos del servicio
interface ServiceData {
  _id: string;
  name: string;
  description: string;
  price: string;
  benefits: string[];
  icon: string;
}

const ServicesPage: React.FC = () => {
  const [servicesData, setServicesData] = useState<ServiceData[]>([]);

  // Función para obtener los datos de los servicios desde la API
  const getServicesData = async () => {
    try {
      const response = await fetch('/api/getservices');
      const data = await response.json();
      setServicesData(data);
    } catch (error) {
      console.error('Error al obtener los servicios:', error);
    }
  };

  useEffect(() => {
    getServicesData();
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Servicios Digitales para cada necesidad</h1>
        <p className={styles.subtitle}>
          Nuestra aplicación ofrece una amplia variedad de servicios digitales para mejorar tu vida diaria.
          Explora nuestras opciones y encuentra el paquete que se adapte perfectamente a tus necesidades.
        </p>
        <div className={styles.cardsContainer}>
          {servicesData.map((service) => (
            <ServiceCard
              key={service._id}
              name={service.name}
              description={service.description}
              price={service.price}
              benefits={service.benefits}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ServicesPage;