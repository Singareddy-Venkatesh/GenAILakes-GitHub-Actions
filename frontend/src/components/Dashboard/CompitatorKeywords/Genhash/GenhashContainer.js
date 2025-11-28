import React, { useState, useContext } from "react";
import styles from "../../../../styles/Competitors_styles/Hastag.module.css";
import LeftCard from "./Hastag";
import RightCard from "./Genai";
import { AnalysisContext } from '../../CompitatorKeywords/context/AnalysisContext';

const Genhash = () => {
  const [selectedCategory, setSelectedCategory] = useState("Hashtags");
  const { analysisData } = useContext(AnalysisContext);
  
  // console.log("Analysis Data in Genhash:", analysisData); // Add this line

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className={styles.container}>
      <LeftCard
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        analysisData={analysisData}  // Verify this prop
      />
      <RightCard
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        analysisData={analysisData}  // Verify this prop
      />
    </div>
  );
};

export default Genhash;
