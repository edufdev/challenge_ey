// components/TotalVentasCard.js

import React from 'react';
import styles from './SummaryCardVentas.module.css';
import { Bar } from 'react-chartjs-2';
import { format } from 'date-fns';
import Link from 'next/link'; // Importamos Link de next para crear enlaces internos


const TotalVentasCard = ({ totalVentas, totalVentasPorDia }) => {
  // Extraemos las fechas y los totales para el gráfico de barras
  const fechas = totalVentasPorDia.map((item) => format(new Date(item._id), 'MM-dd-yyyy'));
  const totales = totalVentasPorDia.map((item) => item.total);

  const data = {
    labels: fechas,
    datasets: [
      {
        label: 'Total de Ventas por Día',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: totales,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className={styles.summaryCardContainerVentas}>
      <div className={styles.summaryCardVentas}>
        <h2>Resumen de Ventas</h2>
        <div className={styles.summaryItemVentas}>
          <h3>Total de Ventas</h3>
          <p>{totalVentas}</p>
          <div className={styles.summaryItemtext}>
            <p>En la siguiente grafica puedes ver el total de ventas que se han hecho por día.</p>
            <Link href="/reporte-admin" className={styles.btn}>
              Ver detalles
            </Link>
          </div>
        </div>
      </div>
      {/* Nuevo contenedor para insertar gráficas */}
      <div className={styles.graphContainer}>
        {/* Componente de gráfica de barras */}
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default TotalVentasCard;
