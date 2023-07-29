import React from 'react';
import styles from './home.module.css';
import Layout from '../components/Layout';
import Link from 'next/link';


const Home: React.FC = () => {
  return (
    <Layout>
      <main className={styles.container}>
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <h1 className={styles.title}>Bienvenido a nuestra plataforma de Servicios Digitales</h1>
            <p className={styles.description}>
              Descubre una amplia gama de servicios digitales para transformar tu vida digital.
              Con nuestra aplicación, podrás acceder a servicios de última generación con facilidad y comodidad.
              Ya sea que necesites internet de alta velocidad, entretenimiento en casa o planes de telefonía móvil,
              estamos aquí para brindarte una experiencia excepcional.
            </p>
            <Link href="/users" className={styles.ctaButton}>
              Registrate
            </Link>
          </div>
        </div>

        <div className={styles.services}>
          <h2 className={styles.servicesTitle}>Servicios Digitales para cada necesidad</h2>
          <p className={styles.servicesDescription}>
            Nuestra aplicación ofrece una amplia variedad de servicios digitales para mejorar tu vida diaria.
            Explora nuestras opciones y encuentra el paquete que se adapte perfectamente a tus necesidades.
          </p>

          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <h3>Internet de alta velocidad</h3>
              <p>Experimenta la rapidez de la conexión con nuestra amplia cobertura de internet.</p>
            </div>
            <div className={styles.serviceCard}>
              <h3>Entretenimiento en casa</h3>
              <p>Disfruta de una amplia variedad de canales y opciones de entretenimiento para toda la familia.</p>
            </div>
            <div className={styles.serviceCard}>
              <h3>Telefonía Residencial</h3>
              <p>Mantente conectado con llamadas ilimitadas y servicios adicionales para tu hogar.</p>
            </div>
            <div className={styles.serviceCard}>
              <h3>Telefonía Móvil</h3>
              <p>Elige entre nuestros planes flexibles y personalizados para tu estilo de vida móvil.</p>
            </div>
          </div>
        </div>

        <div className={styles.cta}>
          {/* <a href="/services" className={styles.ctaButton}> */}
          <Link href="/services" className={styles.ctaButton}>
            Ver todos los servicios
          </Link>
        </div>

        <div className={styles.testimonials}>
          <h2 className={styles.testimonialsTitle}>Lo que nuestros clientes dicen sobre nosotros</h2>
          <div className={styles.testimonialCard}>
            <p className={styles.testimonialText}>
              Gracias a esta plataforma, ahora tengo el internet más rápido que he tenido,
              y también elegí un plan de telefonía móvil que se ajusta perfectamente a mis necesidades.
              ¡Altamente recomendado!
            </p>
            <p className={styles.testimonialAuthor}>- María Sánchez</p>
          </div>
          <div className={styles.testimonialCard}>
            <p className={styles.testimonialText}>
              Llevaba tiempo buscando un servicio de cable que ofreciera todos los canales que quería.
              Esta plataforma me permitió encontrarlo fácilmente y ahora tengo todo lo que necesito para mi entretenimiento.
            </p>
            <p className={styles.testimonialAuthor}>- Juan Pérez</p>
          </div>
            <Link href="/testimonios" className={styles.ctaButton}>
              Ver más
            </Link>
        </div>
      </main>
    </Layout>
  );
};

export default Home;
