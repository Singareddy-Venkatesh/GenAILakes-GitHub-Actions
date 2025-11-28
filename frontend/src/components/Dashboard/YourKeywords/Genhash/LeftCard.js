import React from "react";
import styles from "../../../../styles/Keywords/Hastag.module.css";
import GoogleIcon from '@mui/icons-material/Google';

const LeftCard = ({ selectedCategory, handleCategoryChange, analysisData }) => {
  const getData = () => {
    switch(selectedCategory) {
      case "Hashtags":
        return analysisData.hashtags || [];
      case "Taglines":
        return analysisData.taglines || [];
      case "Keywords":
        return analysisData.keywords || [];
      default:
        return [];
    }
  };

  return (
    <div className={styles.hashCard}>
      <div className={styles.cardContent}>
        <div className={styles.emptyBar}>
          <div className={styles.buttonContainer}>
            <button
              className={`${styles.button} ${selectedCategory === "Hashtags" ? styles.active : ""}`}
              onClick={() => handleCategoryChange("Hashtags")}
            >
              #Hashtag
            </button>
            <button
              className={`${styles.button} ${selectedCategory === "Taglines" ? styles.active : ""}`}
              onClick={() => handleCategoryChange("Taglines")}
            >
              Taglines
            </button>
            <button
              className={`${styles.button} ${selectedCategory === "Keywords" ? styles.active : ""}`}
              onClick={() => handleCategoryChange("Keywords")}
            >
              Keywords
            </button>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.navbar}>
            <GoogleIcon sx={{ marginRight: '2px' }} />
            <h2>Website Analysis</h2>
          </div>
          <div className={styles.timestamp}>
            on {new Date().toLocaleDateString('en-US', { 
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })}
          </div>
          {getData().map((item, index) => (
            <div key={index} className={styles.section}>
              <p>{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default LeftCard;