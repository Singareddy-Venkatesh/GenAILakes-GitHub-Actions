import React from 'react';
import { FaInbox } from 'react-icons/fa';
import styles from '../../../styles/SocialInbox/TopBar.module.css';

const TopBar = () => {
  return (
    <div className={styles['topbar-container']}>
      <div className={styles['topbar-content']}>
        <FaInbox className={styles['topbar-icon']} />
        <h1 className={styles['topbar-heading']}>Social Media inbox</h1>
      </div>
    </div>
  );
};

export default TopBar;