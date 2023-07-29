import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart } from 'chart.js/auto'; // Import the required module
import { BarController, CategoryScale } from 'chart.js'; // Import the required controllers and scales
import styles from './SummaryCard.module.css';
import Link from 'next/link'; // Importamos Link de next para crear enlaces internos


const SummaryCard = ({ totalUsers }) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Register the required controllers and scales with chart.js
    Chart.register(BarController, CategoryScale);

    fetch('/api/gettotalusers')
      .then((response) => response.json())
      .then((data) => {
        // Sort the data by date in ascending order (oldest to newest)
        data.sort((a, b) => new Date(a._id) - new Date(b._id));

        const labels = data.map((item) => item._id);
        const counts = data.map((item) => item.total);

        setData({
          labels: labels,
          datasets: [
            {
              label: 'Total de usuarios por día',
              data: counts,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
      });
  }, []);

  return (
    <div className={styles.summaryCardContainer}>
      <div className={styles.summaryCard}>
        <h2>Resumen de usuarios</h2>
        <div className={styles.summaryItem}>
          <h3>Total de Usuarios</h3>
          <p>{totalUsers}</p>
          <div className={styles.summaryItemtext}>
            <p>En la siguiente grafica puedes ver el total de usuarios registrados por día.</p>
            <Link href="/reporte-admin" className={styles.btn}>
              Ver detalles
            </Link>
          </div>
        </div>
      </div>

      {/* Nuevo contenedor para insertar gráficas */}
      <div className={styles.graphContainer}>
        {data ? (
          <Bar
            data={data}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        ) : (
          <p>Cargando gráfica...</p>
        )}
      </div>
    </div>
  );
};

export default SummaryCard;
