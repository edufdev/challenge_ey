import React, { useState, useEffect } from 'react';
import styles from './UserModuleComponent.module.css';
import { format } from 'date-fns';

const UserModuleComponent = () => {
  const requiredFields = ['name', 'lastName', 'dpi', 'email', 'age', 'residence', 'services', 'password', 'confirmPassword'];

  const [user, setUser] = useState({
    name: '',
    lastName: '',
    dpi: '',
    email: '',
    age: '',
    residence: '',
    services: '',
    password: '',
    confirmPassword: ''
  });

  const [errorVisible, setErrorVisible] = useState(false);
  const [successVisible, setSuccessVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [servicesData, setServicesData] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleServiceChange = (e) => {
    const selectedServiceName = e.target.value;
    const selectedService = servicesData.find((service) => service.name === selectedServiceName);
    if (selectedService) {
      // Concatenamos el nombre y el precio del servicio seleccionado
      const serviceWithPrice = `${selectedService.name} = ${selectedService.price}`;
      setUser((prevUser) => ({
        ...prevUser,
        services: serviceWithPrice,
      }));
      setSelectedService(serviceWithPrice);
    } else {
      setUser((prevUser) => ({
        ...prevUser,
        services: '',
      }));
      setSelectedService('');
    }
  };

  const validatePassword = (password) => {
    // Expresión regular para validar la contraseña (mínimo 6 caracteres, una mayúscula, un caracter especial y un número)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    if (name === 'password') {
      const isPasswordValid = validatePassword(value);
      if (!isPasswordValid) {
        setErrorMessage('Contraseña debe contener al menos: una mayúscula, un caracter especial y un número (mínimo 6 caracteres)');
      } else {
        setErrorMessage('');
      }
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const { value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      confirmPassword: value,
    }));
    if (user.password !== value) {
      setErrorMessage('Las contraseñas no coinciden.');
    } else {
      setErrorMessage('');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };


  useEffect(() => {
    const checkEmailTaken = async () => {
      try {
        const response = await fetch('/api/getusers');
        const data = await response.json();
        const emailExists = data.some((userData) => userData.email === user.email);

        setEmailTaken(emailExists);

        if (emailExists) {
          const message = 'El correo electrónico ingresado ya está registrado para otro usuario.';
          setErrorMessage(message);
          setErrorVisible(true);

          setTimeout(() => {
            setErrorVisible(false);
          }, 10000);
        } else {
          setErrorMessage(''); // Limpiar el mensaje de error cuando el correo es válido
        }
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    const fetchEmailData = async () => {
      if (user.email) {
        await checkEmailTaken();
      }
    };

    fetchEmailData();
  }, [user.email]);



  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentDate = format(new Date(), 'MM-dd-yyyy');
    const userWithDate = { ...user, date: currentDate };

    const allFieldsFilled = requiredFields.every((field) => !!user[field]);
    if (!allFieldsFilled) {
      const message = 'Por favor, complete todos los campos obligatorios.';
      setErrorMessage(message);
      setErrorVisible(true);

      setTimeout(() => {
        setErrorVisible(false);
      }, 10000);

      return;
    }

    if (user.dpi && !/^\d{13}$/.test(user.dpi)) {
      const message = 'DPI debe contener 13 dígitos numéricos.';
      setErrorMessage(message);
      setErrorVisible(true);

      setTimeout(() => {
        setErrorVisible(false);
      }, 10000);

      return;
    }

    const ageNumber = parseInt(user.age);
    if (isNaN(ageNumber) || ageNumber <= 18) {
      const message = 'Edad debe ser un número mayor de 18.';
      setErrorMessage(message);
      setErrorVisible(true);

      setTimeout(() => {
        setErrorVisible(false);
      }, 10000);

      return;
    }

    if (!validatePassword(user.password)) {
      setErrorMessage('Contraseña debe contener al menos: una mayúscula, un caracter especial y un número (mínimo 6 caracteres)');
      setErrorVisible(true);

      setTimeout(() => {
        setErrorVisible(false);
      }, 10000);

      return;
    }

    if (user.password !== user.confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      setErrorVisible(true);

      setTimeout(() => {
        setErrorVisible(false);
      }, 10000);

      return;
    }

  

    try {
      // Validación del correo electrónico tomado
      if (emailTaken) {
        return;
      }

      const response = await fetch('/api/insertuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userWithDate),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Respuesta del backend:', responseData);

        if (responseData.error === 'email_taken') {
          // Si el servidor devuelve un error indicando que el correo ya está en uso
          const message = 'El correo electrónico ingresado ya está registrado para otro usuario.';
          setErrorMessage(message);
          setErrorVisible(true);

          setTimeout(() => {
            setErrorVisible(false);
          }, 10000);
        } else {
          // Si la respuesta es exitosa y no hay error
          setSuccessMessage('Usuario agregado correctamente.');
          setSuccessVisible(true);
          setShowForm(false); // Ocultar el formulario al mostrar el mensaje de éxito

          // Eliminar el mensaje de éxito y mostrar nuevamente el formulario cuando el usuario recargue la página
          window.addEventListener('beforeunload', () => {
            setSuccessVisible(false);
            setShowForm(true);
          });

          // Limpiar el formulario
          setUser({
            name: '',
            lastName: '',
            dpi: '',
            email: '',
            age: '',
            residence: '',
            services: '',
            password: '',
            confirmPassword: ''
          });
        }
      } else {
        const errorMessage = 'Error al agregar el usuario.';
        console.error(errorMessage);
        setErrorMessage(errorMessage);
        setErrorVisible(true);

        setTimeout(() => {
          setErrorVisible(false);
        }, 10000);
      }
    } catch (error) {
      const errorMessage = 'Error al comunicarse con el servidor.';
      console.error(errorMessage, error);
      setErrorMessage(errorMessage);
      setErrorVisible(true);

      setTimeout(() => {
        setErrorVisible(false);
      }, 10000);
    }
  };

  return (
    <div className={styles.container}>
      {showForm ? (
        <>
          <h2 className={styles.title}>Registro de Nuevo Usuario</h2>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={`${styles.formGroup}`}>
              <label htmlFor="name">Nombre:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={user.name}
                onChange={handleChange}
                placeholder="Nombre"
                required
              />
            </div>
            <div className={`${styles.formGroup}`}>
              <label htmlFor="lastName">Apellido:</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={user.lastName}
                onChange={handleChange}
                placeholder="Apellido"
                required
              />
            </div>
            <div className={`${styles.formGroup}`}>
              <label htmlFor="dpi">DPI:</label>
              <input
                type="text"
                id="dpi"
                name="dpi"
                value={user.dpi}
                onChange={handleChange}
                placeholder="DPI"
                required
              />
              {user.dpi && !/^\d{13}$/.test(user.dpi) && (
                <p className={styles.errorText}>(Debe contener 13 valores solo numéricos)</p>
              )}
            </div>
            <div className={`${styles.formGroup}`}>
              <label htmlFor="email">Correo electrónico:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Correo electrónico"
                required
              />
            </div>
            <div className={`${styles.formGroup}`}>
              <label htmlFor="age">Edad:</label>
              <input
                type="number"
                id="age"
                name="age"
                value={user.age}
                onChange={handleChange}
                placeholder="Edad"
                required
              />
              {user.age && (isNaN(parseInt(user.age)) || parseInt(user.age) <= 18) && (
                <p className={styles.errorText}>(Mayor de 18)</p>
              )}
            </div>
            <div className={`${styles.formGroup}`}>
              <label htmlFor="residence">Residencia:</label>
              <input
                type="text"
                id="residence"
                name="residence"
                value={user.residence}
                onChange={handleChange}
                placeholder="Residencia"
                required
              />
            </div>
            <div className={`${styles.formGroup}`}>
              <label htmlFor="services">Selecciona un servicio:</label>
              <select
                id="services"
                name="services"
                value={selectedService}
                onChange={handleServiceChange}
                required
              >
                <option value="" disabled>
                  Selecciona un servicio
                </option>
                {servicesData.map((service) => (
                  <option key={service._id} value={service.name}>
                    {`${service.name} = ${service.price}`}
                  </option>
                ))}
              </select>
            </div>
            <div className={`${styles.formGroup}`}>
              <label htmlFor="password">Contraseña:</label>
              <input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                value={user.password}
                onChange={handlePasswordChange}
                placeholder="Contraseña"
                required
              />
            </div>
            <div className={`${styles.formGroup}`}>
              <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirmar Contraseña"
                required
              />
            </div>
            <div className={styles.showPasswordToggle}>
              <input
                type="checkbox"
                id="showPassword"
                name="showPassword"
                checked={passwordVisible}
                onChange={togglePasswordVisibility}
              />
              <label htmlFor="showPassword">Ver Contraseña</label>
            </div>
            <div className={styles.showPasswordToggle}>
              <input
                type="checkbox"
                id="showConfirmPassword"
                name="showConfirmPassword"
                checked={confirmPasswordVisible}
                onChange={toggleConfirmPasswordVisibility}
              />
              <label htmlFor="showConfirmPassword">Ver Confirmar Contraseña</label>
            </div>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={!requiredFields.every((field) => !!user[field]) || emailTaken || errorMessage !== ''}
            >
              Agregar Usuario
            </button>
          </form>
          {errorVisible && <p className={styles.errorMessage}>{errorMessage}</p>}
          {successVisible && <p className={styles.successMessage}>{successMessage}</p>}
        </>
      ) : (
        <div className={styles.welcomeMessage}>
          <h1>¡Bienvenidos a Nuestra Comunidad Digital!</h1>
          <p>
            En nombre de todo nuestro equipo, queremos darles una cálida bienvenida a nuestra comunidad digital.
            Estamos emocionados de tenerlos aquí y agradecemos la oportunidad de ser parte de su experiencia en línea.
            En este espacio, encontrarán una amplia gama de servicios digitales diseñados para mejorar su vida diaria.
            Desde internet de alta velocidad hasta televisión por cable premium y telefonía residencial ilimitada,
            estamos comprometidos a brindarles soluciones que se adapten perfectamente a sus necesidades.
            Creemos firmemente en la importancia de la conectividad y la tecnología para potenciar sus momentos más
            especiales y hacer su rutina diaria más sencilla y placentera. Nuestro equipo está dedicado a brindarles un
            servicio de calidad, confiable y seguro. Recuerden que estamos aquí para ayudarlos en cada paso del camino.
            Si tienen alguna pregunta o necesitan asistencia, no duden en contactarnos. Nuestro equipo de soporte estará
            encantado de atender sus consultas. Esperamos que disfruten explorando nuestras opciones y encuentren el
            paquete que mejor se adapte a sus necesidades. Estamos ansiosos por ser parte de su viaje digital y esperamos
            que encuentren en nuestros servicios una fuente de satisfacción y bienestar. Gracias por elegirnos. Estamos
            emocionados de embarcarnos juntos en esta emocionante aventura digital. ¡Bienvenidos a nuestra comunidad
            digital!
          </p>
          <button onClick={() => window.location.href = '/login'} className={styles.submitButton}>
            Iniciar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default UserModuleComponent;
