import React, { useState, useEffect } from 'react';
import styles from './configuracionadmin.module.css';

const ConfiguracionAdmin = ({ currentUsername, currentPassword }) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');

  const handleChangeUsername = async () => {
    try {
      // Lógica para cambiar el nombre de usuario
      console.log('Nuevo nombre de usuario:', newUsername);

      const response = await fetch('/api/updatedatauser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'admin.Challenge@gmail.com', newUsername }),
      });

      if (response.ok) {
        console.log('Nombre de usuario actualizado exitosamente');
        setUpdateMessage('Nombre de usuario actualizado correctamente');
        setNewUsername(''); // Limpiar el campo de nuevo nombre de usuario
      } else {
        console.error('Error al actualizar el nombre de usuario');
        setUpdateMessage('Error al actualizar el nombre de usuario');
      }
    } catch (error) {
      console.error('Error al actualizar el nombre de usuario:', error);
      setUpdateMessage('Error al actualizar el nombre de usuario');
    }
  };

  const handleChangePassword = (e) => {
    // Actualizar el estado con el valor de la nueva contraseña
    setNewPassword(e.target.value);
  };

  const handleUpdatePassword = async () => {
    try {
      console.log('Nueva contraseña:', newPassword);

      const response = await fetch('/api/updatedatauser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'admin.Challenge@gmail.com', newPassword }),
      });

      if (response.ok) {
        console.log('Contraseña actualizada exitosamente');
        setUpdateMessage('Contraseña actualizada correctamente');
        setNewPassword(''); // Limpiar el campo de nueva contraseña

        // Actualizar ConfirmPassword junto con el campo de contraseña
        const updatedUserData = await response.json();
        setCurrentPassword(updatedUserData.password);
      } else {
        console.error('Error al actualizar la contraseña');
        setUpdateMessage('Error al actualizar la contraseña');
      }
    } catch (error) {
      console.error('Error al actualizar la contraseña:', error);
      setUpdateMessage('Error al actualizar la contraseña');
    }
  };

  useEffect(() => {
    if (updateMessage) {
      // Recargar la página después de 2 segundos si hay un mensaje de actualización
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [updateMessage]);

  const handleTogglePassword = () => {
    // Cambiar el estado showPassword cuando el botón es presionado
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={styles.container}>
      <h1>Configuración de Usuario</h1>
      {updateMessage && <p>{updateMessage}</p>}
      <div className={styles.section}>
        <h2>Cambiar nombre de usuario</h2>
        <p>Nombre de usuario actual: {currentUsername}</p>
        <div className={styles['label-input-container']}>
          <label htmlFor="newUsername">Nuevo nombre de usuario:</label>
          <input
            type="text"
            id="newUsername"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
          />
        </div>
        <button className={styles.button} onClick={handleChangeUsername}>
          Guardar Cambios
        </button>
      </div>
      {/* Otras secciones y funcionalidades */}
      <div className={styles.section}>
        <h2>Cambiar contraseña de usuario</h2>
        <p>Contraseña de usuario actual: {showPassword ? currentPassword : '••••••••••••••••••••••'}</p>
        <div className={styles['label-input-container']}>
          <label htmlFor="newPassword">Nueva contraseña:</label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="newPassword"
            value={newPassword}
            onChange={handleChangePassword}
          />
        </div>
        <button className={styles.button} onClick={handleUpdatePassword}>
          Guardar Cambios
        </button>
        <p></p>
        <button className={styles.button} onClick={handleTogglePassword}>
          {showPassword ? 'Ocultar Contraseña' : 'Mostrar Contraseña'}
        </button>
      </div>
      {/* Otras secciones y funcionalidades */}
    </div>
  );
};

export default ConfiguracionAdmin;
