import React from 'react'; 
import { FaCheckCircle, FaRegCheckCircle } from "react-icons/fa";
import styles from "../../../styles/Contentpush/App.module.css";

const ProgressBar = () => {
  const steps = [
    { label: "Details", completed: false },
    { label: "Ad Format", completed: false },
    { label: "Upload Assets", completed: false },
    { label: "Preview & Launch", completed: false },
  ];

  return (
    <div 
      className={styles.container} 
      style={{
        background: 'transparent',
        backgroundcolor:'rgba(255, 255, 255, 0.1)',
        border: 'none',
        backdropfilter: 'blur(10px)',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)' // Subtle shadow
      }}
    >
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          {/* Only add connector for steps after the first one */}
          {index > 0 && (
            <div className={styles.connectorContainer}>
              <div className={styles.dottedLine}>......</div>
              <span className={styles.chevron}>{">"}</span>
            </div>
          )}
          
          <div className={styles.step}>
            <div className={styles.iconWrapper}>
              {step.completed ? (
                <FaCheckCircle 
                  className={styles.checkIcon} 
                  style={{ color: 'Black' }} 
                />
              ) : (
                <FaRegCheckCircle 
                  className={styles.checkIcon} 
                  style={{ color: '#4a5568' }} 
                />
              )}
            </div>
            
            <span
              className={`${styles.label} ${
                step.completed ? styles.activeLabel : styles.inactiveLabel
              }`}
            >
              {step.label}
            </span>
          </div>
        </React.Fragment>
      ))}    
    </div>
  );
};

export default ProgressBar;
