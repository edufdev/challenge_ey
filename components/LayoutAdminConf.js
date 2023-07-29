import React from 'react';
import HeaderAdmin from './HeaderAdminConfig';
import styles from './LayoutAdmin.module.css';

const LayoutAdmin = ({ children }) => {
  return (
    <div className={styles.container}>
      <HeaderAdmin />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default LayoutAdmin;
