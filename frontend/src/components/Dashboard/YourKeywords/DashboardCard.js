import React, { useContext, useEffect, useState } from 'react';
import styles from '../../../styles/Keywords/DashboardCard.module.css';

import { AnalysisContext } from '../../../components/Dashboard/YourKeywords/context/AnalysisContext';
import { Link } from '@mui/material';

export default function DashboardCard() {
  const { analysisData } = useContext(AnalysisContext);
  const [metrics, setMetrics] = useState({
    ideas: 45,
    outline: 31,
    draft: 18,
    content: 6,
    keywords: 32,
    hashtags: 48,
    taglines: 55,
    totalScore: 2056
  });

  useEffect(() => {
    // Only update if we have valid analysis data from URL
    if (analysisData && analysisData.hashtags && analysisData.keywords && analysisData.taglines) {
      // Get actual counts
      const hashtagCount = analysisData.hashtags.length;
      const keywordCount = analysisData.keywords.length;
      const taglineCount = analysisData.taglines.length;
      const totalItems = hashtagCount + keywordCount + taglineCount;

      if (totalItems > 0) {
        // Calculate actual percentages based on the analyzed content
        const ideasPercentage = Math.round((hashtagCount / totalItems) * 100);
        const outlinePercentage = Math.round((keywordCount / totalItems) * 100);
        const draftPercentage = Math.round((taglineCount / totalItems) * 100);
        const contentPercentage = 100 - (ideasPercentage + outlinePercentage + draftPercentage);

        // Calculate progress percentages based on expected counts
        // Expected: 8 hashtags, 5 keywords, 5 taglines
        const hashtagProgress = Math.round((hashtagCount / 8) * 100);
        const keywordProgress = Math.round((keywordCount / 5) * 100);
        const taglineProgress = Math.round((taglineCount / 5) * 100);

        // Update all metrics with actual data
        setMetrics({
          ideas: ideasPercentage,
          outline: outlinePercentage,
          draft: draftPercentage,
          content: contentPercentage,
          keywords: Math.min(keywordProgress, 100),
          hashtags: Math.min(hashtagProgress, 100),
          taglines: Math.min(taglineProgress, 100),
          totalScore: analysisData.contentScore || Math.round(
            (hashtagProgress + keywordProgress + taglineProgress) / 3 * 20
          )
        });

        // Update pie chart visualization
        const pieChart = document.querySelector(`.${styles.pieChart}`);
        if (pieChart) {
          pieChart.style.background = `conic-gradient(
            #FF6B6B 0% ${contentPercentage}%, 
            #FFB067 ${contentPercentage}% ${contentPercentage + draftPercentage}%, 
            #9775FA ${contentPercentage + draftPercentage}% ${contentPercentage + draftPercentage + outlinePercentage}%,
            #4169E1 ${contentPercentage + draftPercentage + outlinePercentage}% 100%
          )`;
        }
      }
    }
  }, [analysisData]); // Only re-run when analysisData changes

  return (
    <div className={styles.container}>
      <nav className={styles.cardNavbar}>
        <span className={styles.icon}>📋</span>
        <h2 className={styles.navTitle}>Your Keywords, Trends, Insights</h2>
        <Link href="/" className={styles.closeButton}>✕</Link>
      </nav>
      
      <div className={styles.content}>
        <div className={styles.pieChartSection}>
          <div className={styles.chartContainer}>
            <div className={styles.pieChart}></div>
            <div className={styles.labels}>
              <p><span className={styles.contentText}>{metrics.content}%</span> To write content</p>
              <p><span className={styles.draftText}>{metrics.draft}%</span> To draft content</p>
              <p><span className={styles.outlineText}>{metrics.outline}%</span> To create Outline</p>
              <p><span className={styles.ideasText}>{metrics.ideas}%</span> Ideas and Inspiration</p>
            </div>
          </div>
        </div>

        <div className={styles.progressSection}>
          <div className={styles.progressBar}>
            <span className={styles.barLabel}>Keywords</span>
            <div className={styles.bar}>
              <div 
                className={styles.keywords} 
                style={{
                  width: `${metrics.keywords}%`,
                  transition: 'width 0.5s ease-in-out'
                }}
              ></div>
            </div>
            <span>{Math.round(metrics.keywords)}%</span>
          </div>

          <div className={styles.progressBar}>
            <span className={styles.barLabel}>Hashtags</span>
            <div className={styles.bar}>
              <div 
                className={styles.hashtags} 
                style={{
                  width: `${metrics.hashtags}%`,
                  transition: 'width 0.5s ease-in-out'
                }}
              ></div>
            </div>
            <span>{Math.round(metrics.hashtags)}%</span>
          </div>

          <div className={styles.progressBar}>
            <span className={styles.barLabel}>Taglines</span>
            <div className={styles.bar}>
              <div 
                className={styles.taglines} 
                style={{
                  width: `${metrics.taglines}%`,
                  transition: 'width 0.5s ease-in-out'
                }}
              ></div>
            </div>
            <span>{Math.round(metrics.taglines)}%</span>
          </div>
        </div>

        <div className={styles.totalScore}>
          <h1>{metrics.totalScore}</h1>
          <p>Total Score</p>
        </div>
      </div>
    </div>
  );
}
