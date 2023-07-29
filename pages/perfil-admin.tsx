// pages/perfil-admin.tsx

import React, { useState, useEffect } from 'react';
import LayoutAdmin from '../components/LayoutAdmin';
import PerfilAdmin from '../components/PerfilAdmin';
import SummaryCard from '../components/SummaryCard';
import TotalVentasCard from '../components/TotalVentasCard'; // Asegurarse de importar el componente correctamente 

const PerfilAdminPage = () => {
  // State to store the total number of users
  const [totalUsers, setTotalUsers] = useState(0);

  // State to store the total number of ventas
  const [totalVentas, setTotalVentas] = useState(0);

  // State para almacenar los datos de ventas por día
  const [totalVentasPorDia, setTotalVentasPorDia] = useState([]);

  // Get the total number of users from the API
  useEffect(() => {
    fetch('/api/getusers')
      .then((response) => response.json())
      .then((data) => {
        setTotalUsers(data.length);
      })
      .catch((error) => {
        console.error('Error fetching total users:', error);
      });
  }, []);

  // Get the total number of ventas from the API
  useEffect(() => {
    fetch('/api/gettotalventas')
      .then((response) => response.json())
      .then((data) => {
        setTotalVentas(data.totalVentas); // Use data.totalVentas instead of data.length
      })
      .catch((error) => {
        console.error('Error fetching total ventas:', error);
      });
  }, []);

  useEffect(() => {
    // Llamada a la API para obtener el total de ventas por día
    fetch('/api/gettotalventaspordia')
      .then((response) => response.json())
      .then((data) => {
        setTotalVentasPorDia(data.totalVentasPorDia);
      })
      .catch((error) => {
        console.error('Error fetching total ventas por día:', error);
      });
  }, []);

  return (
    <LayoutAdmin>
      <div>
        <PerfilAdmin />
        <SummaryCard totalUsers={totalUsers} />
        {/* Pasar totalVentas y totalVentasPorDia al componente TotalVentasCard */}
        <TotalVentasCard totalVentas={totalVentas} totalVentasPorDia={totalVentasPorDia} />
      </div>
    </LayoutAdmin>
  );
};

export default PerfilAdminPage;
