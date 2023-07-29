import React, { useState, useEffect } from 'react';
import LayoutAdmin from '../components/LayoutAdminConf';
import ConfiguracionAdmin from '../components/configuracionadmin';

const ConfiguracionAdminPage = () => {
  const [currentUsername, setCurrentUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');

  useEffect(() => {
    // Función para obtener los datos del usuario por correo electrónico
    const getUserData = async () => {
      const email = 'admin.Challenge@gmail.com'; // Reemplaza con el correo electrónico del usuario
      try {
        const response = await fetch(`/api/getdatausers?email=${encodeURIComponent(email)}`);
        if (response.ok) {
          const userData = await response.json();
          setCurrentUsername(userData.name);
          setCurrentPassword(userData.password);
        } else {
          console.error('Error al obtener los datos del usuario');
        }
      } catch (error) {
        console.error('Error de red:', error);
      }
    };

    // Llamada a la función para obtener los datos del usuario
    getUserData();
  }, []);

  return (
    <LayoutAdmin>
      <ConfiguracionAdmin currentUsername={currentUsername} currentPassword={currentPassword} />
    </LayoutAdmin>
  );
};

export default ConfiguracionAdminPage;
