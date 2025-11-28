import React, { useState } from 'react';
import styles from '../../../styles/Keywords/SocialCard.module.css';
import { FaLinkedin, FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLink, FaGlobe } from 'react-icons/fa';

const SocialCard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validate URL
    if (!searchTerm.startsWith('http://') && !searchTerm.startsWith('https://')) {
      setError('Please enter a valid URL starting with http:// or https://');
      setLoading(false);
      return;
    }

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
        throw new Error(errorData.detail || 'Failed to analyze website');
      }

      const data = await response.json();
      setAnalysis(data.response);
    } catch (error) {
      setError(error.message);
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
              className={styles.submitButton}
              disabled={loading}
            >
              {loading ? 'Analyzing...' : 'Submit'}
            </button>
          </form>
        </div>

        {error && (
          <div className="text-red-500 text-center mt-4">
            Error: {error}
          </div>
        )}
        
        {analysis && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow">
            <div className="whitespace-pre-wrap prose">
              {analysis.split('\n').map((line, index) => (
                <p key={index} className="mb-2">
                  {line}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialCard;