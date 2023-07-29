import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './LoginComponent.module.css';

const LoginComponent = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar u ocultar la contraseña
  const [successMessage, setSuccessMessage] = useState('');

  const getUserData = async (token) => {
    try {
      const response = await fetch('/api/getusers', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`, // Agregamos el token JWT en los headers de la solicitud
        },
      });

      if (response.ok) {
        const userData = await response.json();
        const userEmail = userData.email;
        console.log('Correo electrónico del usuario autenticado:', userEmail);

        // Aquí puedes guardar el correo electrónico en el estado o realizar otras acciones según tus necesidades
      } else {
        console.error('Error al obtener los datos del usuario');
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Limpiar el mensaje de error al modificar los campos de texto
    setErrorMessage('');
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/getlogin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        const { token } = data;
        getUserData(token);
        // Si el inicio de sesión es exitoso, verificamos el correo electrónico para la redirección específica
        if (formData.email === 'admin.Challenge@gmail.com') {
          // Si el correo ingresado es "admin.Challenge@gmail.com", redirigimos a /perfil-admin
          router.push('/perfil-admin');
        } else {
          // Si el correo ingresado es diferente, redirigimos a /perfil
          router.push('/perfil');
        }
      } else {
        setErrorMessage(data.message || 'Error al iniciar sesión.');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setErrorMessage('Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleRegisterClick = () => {
    router.push('/users');
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="email">Correo electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Correo electrónico"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="password">Contraseña:</label>
          <input
            type={showPassword ? 'text' : 'password'} // Mostrar u ocultar la contraseña según el estado
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Contraseña"
            required
          />
          <button type="button" onClick={toggleShowPassword} className={styles.showPasswordButton}>
            {showPassword ? 'Ocultar' : 'Mostrar'} Contraseña
          </button>
        </div>
        <div className={styles.errorContainer}>
          {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
          {successMessage && <p className={`${styles.successMessage} ${styles.welcomeMessage}`}>{successMessage}</p>}
        </div>
        <button type="submit" className={styles.submitButton}>
          Iniciar Sesión
        </button>
      </form>
      {/* Parte adicional para el enlace de registro */}
      <div className={styles.registerLinkContainer}>
        <p>¿Eres nuevo? <span className={styles.registerLink} onClick={handleRegisterClick}>Regístrate</span></p>
      </div>
    </>
  );
};

export default LoginComponent;
