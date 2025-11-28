import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaYoutube } from 'react-icons/fa';
import TopBar from './TopBar';
import CommentSection from "./CommentSection";
import UrgentAlerts from "./UrgentAlerts";
import styles from '../../../styles/SocialInbox/CardBoard.module.css';

const CardBoard = () => {
  const platforms = [
    { name: 'LinkedIn', icon: <FaLinkedin /> },
    { name: 'Facebook', icon: <FaFacebook /> },
    { name: 'Twitter', icon: <FaTwitter /> },
    { name: 'Instagram', icon: <FaInstagram /> },
    { name: 'YouTube', icon: <FaYoutube /> },
  ];

  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0].name);
  const [urgentMessages, setUrgentMessages] = useState([]);
  const [messageFilters, setMessageFilters] = useState({
    messageType: 'all',
    timeRange: 'all',
    priority: 'all'
  });
  const [unifiedFeed, setUnifiedFeed] = useState([]);

  useEffect(() => {
    const syncMessages = () => {
      setUnifiedFeed(generateUrgentMessages(selectedPlatform));
    };

    syncMessages();
    const syncInterval = setInterval(syncMessages, 30000);
    return () => clearInterval(syncInterval);
  }, [selectedPlatform]);

  const handleSelectPlatform = (platformName) => {
    setSelectedPlatform(platformName);
    const container = document.querySelector('[class*="dashboard-container"]');
    if (container) {
      container.style.setProperty('--platform-color', getPlatformColor(platformName));
    }
    const messages = generateUrgentMessages(platformName);
    setUrgentMessages(messages);
  };

  const handleFilterChange = (filterType, value) => {
    setMessageFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const getFilteredMessages = () => {
    return unifiedFeed.filter(message => {
      const matchesType = messageFilters.messageType === 'all' || message.type === messageFilters.messageType;
      const matchesTime = applyTimeFilter(message.timestamp, messageFilters.timeRange);
      const matchesPriority = messageFilters.priority === 'all' || message.priority === messageFilters.priority;
      return matchesType && matchesTime && matchesPriority;
    });
  };

  const applyTimeFilter = (timestamp, timeRange) => {
    const messageDate = new Date(timestamp);
    const now = new Date();
    
    switch(timeRange) {
      case 'today':
        return messageDate.toDateString() === now.toDateString();
      case 'week':
        const weekAgo = new Date(now.setDate(now.getDate() - 7));
        return messageDate >= weekAgo;
      case 'month':
        const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
        return messageDate >= monthAgo;
      default:
        return true;
    }
  };

  const getPlatformColor = (platform) => {
    switch(platform) {
      case 'LinkedIn': return '#0077B5';
      case 'Facebook': return '#1877F2';
      case 'Twitter': return '#1DA1F2';
      case 'Instagram': return '#E4405F';
      case 'YouTube': return '#FF0000';
      default: return '#B8B2EB';
    }
  };

  const generateUrgentMessages = (platform) => {
    return [
      {
        id: Date.now(),
        platform: platform,
        type: 'DM',
        message: `New direct message from ${platform}!`,
        timestamp: new Date().toISOString(),
        aiSuggestion: `AI Response: Analyzing ${platform} message content.`,
        priority: 'high'
      },
      {
        id: Date.now() + 1,
        platform: platform,
        type: 'comment',
        message: `Important comment on ${platform} post`,
        timestamp: new Date().toISOString(),
        aiSuggestion: `AI Response: Suggested reply for ${platform} comment.`,
        priority: 'medium'
      },
      {
        id: Date.now() + 2,
        platform: platform,
        type: 'mention',
        message: `Brand mention on ${platform}`,
        timestamp: new Date().toISOString(),
        aiSuggestion: `AI Response: Engagement strategy for ${platform} mention.`,
        priority: 'low'
      }
    ];
  };

  return (
    <div className={styles['dashboard-container']}>
      <TopBar 
        filters={messageFilters}
        onFilterChange={handleFilterChange}
      />
      <div className={styles.content}>
        <div className={styles.sidebar}>
          <ul>
            {platforms.map((platform) => (
              <li
                key={platform.name}
                className={`${styles['sidebar-item']} ${
                  selectedPlatform === platform.name ? styles.active : ''
                }`}
                onClick={() => handleSelectPlatform(platform.name)}
              >
                <div className={styles['platform-icon']}>{platform.icon}</div>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles['main-content']}>
          <div className={`${styles['content-section']} ${styles.comments}`}>
            <CommentSection 
              selectedPlatform={selectedPlatform}
              messages={getFilteredMessages()}
            />
          </div>
          <div className={`${styles['content-section']} ${styles.alerts}`}>
            <UrgentAlerts 
              selectedPlatform={selectedPlatform} 
              urgentMessages={urgentMessages}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBoard;
