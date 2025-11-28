import React, { useState, useContext } from 'react';
import styles from '../../../styles/Competitors_styles/SocialCard.module.css';
import { AnalysisContext } from '../CompitatorKeywords/context/AnalysisContext';
import { FaLinkedin, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLink, FaGlobe } from 'react-icons/fa';

const SocialCard = () => {
  const { setAnalysisData } = useContext(AnalysisContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const parseAnalysisResponse = (analysisText) => {
    const lines = analysisText.split('\n').filter(line => line.trim());
    
    const hashtags = lines
      .filter(line => line.trim().startsWith('#'))
      .map(line => line.trim());
    
    const keywords = lines
      .filter(line => line.trim().startsWith('-'))
      .map(line => line.trim().substring(2));
    
    const taglines = lines
      .filter(line => line.trim().startsWith('"'))
      .map(line => line.trim().replace(/^"|"$/g, ''));
    
    return { hashtags, keywords, taglines };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: searchTerm }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Analysis failed');
      }

      const data = await response.json();
      const parsedData = {
        ...parseAnalysisResponse(data.analysis),
        metadata: data.metadata,
        timestamp: data.timestamp
      };

      // Get analytics data
      const analyticsResponse = await fetch(`http://localhost:8000/analytics/${data.metadata.analysis_id}`);
      const analyticsData = await analyticsResponse.json();

      setAnalysisData({
        keywords: parsedData.keywords,
        hashtags: parsedData.hashtags,
        taglines: parsedData.taglines,
        socialMediaMetrics: analyticsData.metrics || {},
        metadata: parsedData.metadata,
        timestamp: parsedData.timestamp,
        analytics: analyticsData
      });

      // Store trends data
      const trendsResponse = await fetch('http://localhost:8000/trends');
      const trendsData = await trendsResponse.json();
      
      console.log("Analysis Complete:", {
        parsedData,
        analytics: analyticsData,
        trends: trendsData
      });

    } catch (error) {
      setError(error.message || 'Analysis failed. Please try again.');
      console.error('Analysis Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.socialCard} ${styles.fadeIn}`}>
      <div className="flex flex-col space-y-6 w-full">
        <div className="flex flex-row items-start ml-4 my-6">
          <a href="#" target="_blank" rel="noopener noreferrer" className={styles.iconWrapper}>
            <FaLink style={{ color: '#2E2E2E' }} className={`${styles.socialIcon} transform hover:scale-110 transition-all`} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.iconWrapper}>
            <FaLinkedin style={{ color: '#0077B5' }} className={`${styles.socialIcon} transform hover:scale-110 transition-all`} />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className={styles.iconWrapper}>
            <FaFacebook style={{ color: '#1877F2' }} className={`${styles.socialIcon} transform hover:scale-110 transition-all`} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.iconWrapper}>
            <FaInstagram style={{ color: '#E4405F' }} className={`${styles.socialIcon} transform hover:scale-110 transition-all`} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.iconWrapper}>
            <FaTwitter style={{ color: '#1DA1F2' }} className={`${styles.socialIcon} transform hover:scale-110 transition-all`} />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.iconWrapper}>
            <FaYoutube style={{ color: '#FF0000' }} className={`${styles.socialIcon} transform hover:scale-110 transition-all`} />
          </a>
        </div>
        
        <div className={styles.searchContainer}>
          <form onSubmit={handleSubmit} className={styles.searchWrapper}>
            <FaGlobe className={styles.globeIcon} />
            <input
              type="text"
              placeholder="Website link here..."
              value={searchTerm}
              onChange={handleSearch}
              className={styles.searchInput}
            />
            <button
              type="submit"
              className={`${styles.submitButton} ${loading ? styles.loading : ''}`}
              disabled={loading || !searchTerm}
            >
              {loading ? 'Analyzing...' : 'Submit'}
            </button>
          </form>
        </div>

        {error && (
          <div className="text-red-500 text-center mt-4">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialCard;
