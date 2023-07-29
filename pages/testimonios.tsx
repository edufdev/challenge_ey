import React from 'react';
import Head from 'next/head';
import Link from 'next/link'; // Importamos Link de next para crear enlaces internos
import Layout from '../components/Layout';
import Testimonios from '../components/Testimonios';
import styles from './Testimonios.module.css';

const TestimoniosPage = () => {
  return (
    <Layout>
      <Head>
        <title>Testimonios | Mi Sitio Web</title>
      </Head>
      <div className={styles.container}>
        <h1 className={styles.title}>
          ¡Nuestros Clientes Satisfechos Hablan por Sí Mismos!
        </h1>
        <p className={styles.subtitle}>
          Descubre por qué nuestros servicios han dejado una impresión duradera en nuestros clientes. Aquí están algunas de sus experiencias y opiniones. ¡Únete a nuestra comunidad y sé parte de la experiencia única que ofrecemos!
        </p>
        <Testimonios />
        <p></p>
        <p></p>
        <Link href="/login" className={styles.btn}>
              Danos tu opinión
        </Link>
      </div>
    </Layout>
  );
};

export default TestimoniosPage;
