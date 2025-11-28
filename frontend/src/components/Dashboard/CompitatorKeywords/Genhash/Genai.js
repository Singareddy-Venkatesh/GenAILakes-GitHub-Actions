import React from "react";
import { BsStars } from 'react-icons/bs';
import { FaYoutube, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import styles from "./Genai.module.css";

const RightCard = ({ selectedCategory, handleCategoryChange, analysisData }) => {
    const platformIcons = {
      YouTube: <FaYoutube />,
      Facebook: <FaFacebook />,
      Twitter: <FaTwitter />,
      LinkedIn: <FaLinkedin />,
      Instagram: <FaInstagram />
    };

    const platformStyles = {
      YouTube: { background: '#FF0000', color: 'white' },
      Facebook: { background: '#1877F2', color: 'white' },
      Twitter: { background: '#1DA1F2', color: 'white' },
      LinkedIn: { background: '#0A66C2', color: 'white' },
      Instagram: { background: '#E4405F', color: 'white' }
    };

    const getPlatformContent = (platform) => {
      const platformFilters = {
        YouTube: (item) => true,
        Facebook: (item) => true,
        LinkedIn: (item) => true,
        Twitter: (item) => true,
        Instagram: (item) => true
      };

      const filter = platformFilters[platform];

      return {
        hashtags: (analysisData?.hashtags || []).map(hashtag => ({
          text: hashtag.startsWith('#') ? hashtag : `#${hashtag}`,
          platform: platform
        })),
        keywords: (analysisData?.keywords || []).map(keyword => ({
          text: keyword,
          platform: platform
        })),
        taglines: (analysisData?.taglines || []).map(tagline => ({
          text: tagline,
          platform: platform
        }))
      };
    };

    const renderSocialCards = () => {
      return Object.entries(platformIcons).map(([platform]) => {
        const content = getPlatformContent(platform);
        let displayContent = [];

        switch(selectedCategory) {
          case "Hashtags":
            displayContent = content.hashtags;
            break;
          case "Keywords":
            displayContent = content.keywords;
            break;
          case "Taglines":
            displayContent = content.taglines;
            break;
        }

        return (
          <div key={platform} className={styles.websiteCard}>
            <div className={styles.cardTopbar}>
              <span className={styles.iconWrapper} style={platformStyles[platform]}>
                {platformIcons[platform]}
              </span>
              <h3 className={styles.platformTitle}>{platform}</h3>
            </div>

            <div className={styles.contentSection}>
              <div className={styles.tagContainer}>
                {displayContent.map((item, index) => (
                  <span
                    key={`${platform}-${selectedCategory}-${index}`}
                    className={styles.tag}
                  >
                    {item.text}
                  </span>
                ))}
              </div>
              
              {displayContent.length === 0 && (
                <div className={styles.emptyState}>
                  No {selectedCategory.toLowerCase()} available for {platform}
                </div>
              )}
            </div>
          </div>
        );
      });
    };

    return (
      <div className={styles.aiCard}>
        <div className={styles.navbar}>
          <h2>
            <BsStars style={{ marginRight: '8px', color: '#2915F9' }} />
            Industry Trends
          </h2>
        </div>
        <div className={styles.emptyBar}>
          <div className={styles.navigationButtons}>
            <button
              className={`${styles.navButton} ${selectedCategory === "Hashtags" ? styles.active : ""}`}
              onClick={() => handleCategoryChange("Hashtags")}
            >
              # Hashtag
            </button>
            <button
              className={`${styles.navButton} ${selectedCategory === "Keywords" ? styles.active : ""}`}
              onClick={() => handleCategoryChange("Keywords")}
            >
              Keywords
            </button>
            <button
              className={`${styles.navButton} ${selectedCategory === "Taglines" ? styles.active : ""}`}
              onClick={() => handleCategoryChange("Taglines")}
            >
              Taglines
            </button>
          </div>
        </div>
        <div className={styles.cardsContainer}>
          {renderSocialCards()}
        </div>
      </div>
    );
};

export default RightCard;
