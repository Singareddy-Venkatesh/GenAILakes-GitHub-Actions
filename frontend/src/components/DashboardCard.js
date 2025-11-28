import React from 'react';
import '../styles/Dashboard/DashboardCard.module.css'; // Import the styles for the card

const DashboardCard = ({ children, className = '', style = {} }) => {
  return (
    <div className={`dashboard-card ${className}`} style={style}>
      {children}
    </div>
  );
};

export default DashboardCard;
