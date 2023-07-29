import React from 'react';
import Header from './Header'; // Asegúrate de que la ruta al componente Header sea correcta

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
};

export default Layout;
