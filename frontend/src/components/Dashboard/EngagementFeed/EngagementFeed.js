import React, { useEffect, useState } from "react";
import Charts from "./Charts";
import { Bar, Doughnut } from "react-chartjs-2";

import styles from "../../../styles/Engagementfeed/EngagementFeed.module.css";
import { LinkedIn, Facebook, Instagram } from "@mui/icons-material";
import TwitterIcon from '@mui/icons-material/Twitter';
import SocialMediaCard from './SocialMediaCard';

export const EngagementFeed = () => {
  const [feedItems, setFeedItems] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("OpenAI");
  const [trendsData, setTrendsData] = useState({
    dates: [],
    posts: [],
    sentiments: { Positive: 0, Neutral: 0, Negative: 0 },
  });
  const [influencersData, setInfluencersData] = useState([]);
  const [platformMetrics, setPlatformMetrics] = useState({});
  const [dataSource, setDataSource] = useState("CSV");
  const [error, setError] = useState(null);

  const [showGraphs, setShowGraphs] = useState(true);
  const [showComments, setShowComments] = useState(true);
  const [showInfluencers, setShowInfluencers] = useState(true);
  const [showMentions, setShowMentions] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('quickResponses');

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const socialPosts = [
    {
      platform: 'LinkedIn',
      content: {
        name: 'Gen AI',
        meta: 'Company Technical — AI • 16h',
        profileImage: '/path-to-profile-image.png',
        text: 'Hello, I am looking for a new career opportunity and would appreciate your support. Thanks in advance for any contact recommendation, advice, or ... hebwhjbfwhbfldjwefjkwcns dmncbuyhfewfjhwefyugwefbjwebwelifuhuliwejfnlkjweqnflejhouilhejlfbeoirfheirjfnerjwfbkljnlfkenjflihuoilenfklefljerofuiheienjlerjfnkejhbfouiherifjkfnlelifhuoeuhfiuef',
        reactions: '77',
        commentCount: '11'
      }
    },
    {
      platform: 'Facebook',
      content: {
        name: 'Gen AI',
        meta: '20 de janeiro',
        profileImage: '/path-to-profile-image.png',
        text: 'InnovateAI is a cutting-edge technology firm specializing in artificial intelligence solutions that drive efficiency and innovation across various industries.',
        reactions: '62',
        commentCount: '8'
      }
    },
    {
      platform: 'X Twitter',
      content: {
        name: 'Gen AI',
        meta: '@Gen ai·6days',
        profileImage: '/path-to-profile-image.png',
        text: 'InnovateAI is a cutting-edge technology firm specializing in artificial intelligence solutions that drive efficiency and innovation across various industries. Our mission is to harness the power of AI to transform businesses, improve decision-making, and enhance customer experiences.',
        reactions: '45',
        commentCount: '7'
      }
    },
    {
      platform: 'Instagram',
      content: {
        name: 'Gen AI',
        meta: '2 days ago',
        profileImage: '/path-to-profile-image.png',
        text: 'Exploring the future of AI innovation! 🤖✨ #ArtificialIntelligence #Innovation #Tech',
        reactions: '156',
        commentCount: '23'
      }
    },
    {
      platform: 'YouTube',
      content: {
        name: 'Gen AI',
        meta: '1 week ago',
        profileImage: '/path-to-profile-image.png',
        text: 'How AI is Transforming Business in 2024 | Latest Innovations and Trends',
        reactions: '1.2K',
        commentCount: '89'
      }
    }
  ];

  // Fetch mentions for the selected brand
  // const fetchFeedItems = async () => {
  //   try {
  //     const response = await fetch(
  //       `http://127.0.0.1:8000/twitter-mentions/?brand=${selectedBrand}&timestamp=${Date.now()}`
  //     );
  //     if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  //     const data = await response.json();
  //     setFeedItems(data);
  //     setDataSource("Twitter API");
  //     setError(null);
  //   } catch (err) {
  //     console.error("Error fetching feed items:", err);
  //     setError("Failed to fetch Twitter API data. Showing fallback data.");
  //     setDataSource("CSV");
  //   }
  // };

  // const fetchTrendsData = async () => {
  //   try {
  //     const response = await fetch("http://127.0.0.1:8000/engagement-trends/");
  //     const data = await response.json();
  //     setTrendsData(data);
  //   } catch (err) {
  //     console.error("Error fetching trends data:", err);
  //   }
  // };

  // const fetchInfluencersData = async () => {
  //   try {
  //     const response = await fetch("http://127.0.0.1:8000/influencers/");
  //     const data = await response.json();
  //     setInfluencersData(data);
  //   } catch (err) {
  //     console.error("Error fetching influencers data:", err);
  //   }
  // };

  // const fetchPlatformMetrics = async () => {
  //   try {
  //     const response = await fetch("http://127.0.0.1:8000/platform-metrics/");
  //     const data = await response.json();
  //     setPlatformMetrics(data);
  //   } catch (err) {
  //     console.error("Error fetching platform metrics:", err);
  //   }
  // };

  // useEffect(() => {
  //   fetchFeedItems();
  //   fetchTrendsData();
  //   fetchInfluencersData();
  //   fetchPlatformMetrics();

  //   const interval = setInterval(fetchFeedItems, 10000);
  //   return () => clearInterval(interval);
  // }, [selectedBrand]);

  // Donut chart data (for total comments breakdown)
  const donutData = {
    labels: ["Answered", "Unanswered"],
    datasets: [
      {
        data: [Math.floor(feedItems.length * 0.3), Math.ceil(feedItems.length * 0.7)],
        backgroundColor: ["#4caf50", "#ff5722"],
      },
    ],
  };

  // Engagement bar graph data
  const engagementBarData = {
    labels: ["Likes", "Followers", "Retweets"],
    datasets: [
      {
        label: "Engagement Overview",
        data: [
          platformMetrics.Twitter?.likes || 0,
          platformMetrics.Twitter?.mentions || 0,
          platformMetrics.Twitter?.retweets || 0,
        ],
        backgroundColor: ["#4caf50", "#2196f3", "#ff5722"],
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 15,
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className={styles.feedContainer}>
      {/* Header Section */}
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h1 className={styles.title}>Engagement & interaction Feed</h1>
        </div>
        <div className={styles.filterContainer}>
          <div 
            className={styles.filterSection} 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          >
            <svg 
              className={styles.filterIcon} 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M3 4.5C3 4.22386 3.22386 4 3.5 4H20.5C20.7761 4 21 4.22386 21 4.5V6.5C21 6.77614 20.7761 7 20.5 7H3.5C3.22386 7 3 6.77614 3 6.5V4.5Z" 
                fill="currentColor"
              />
              <path 
                d="M6 11.5C6 11.2239 6.22386 11 6.5 11H17.5C17.7761 11 18 11.2239 18 11.5V13.5C18 13.7761 17.7761 14 17.5 14H6.5C6.22386 14 6 13.7761 6 13.5V11.5Z" 
                fill="currentColor"
              />
              <path 
                d="M9 18.5C9 18.2239 9.22386 18 9.5 18H14.5C14.7761 18 15 18.2239 15 18.5V20.5C15 20.7761 14.7761 21 14.5 21H9.5C9.22386 21 9 20.7761 9 20.5V18.5Z" 
                fill="currentColor"
              />
            </svg>
            <span>Filter Priority</span>
          </div>
          
          {isFilterOpen && (
            <div className={styles.filterDropdown}>
              <button className={styles.filterOption}>
                <svg className={`${styles.flagIcon} ${styles.highPriority}`} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 21V4H20L15 9L20 14H4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                High
              </button>
              <button className={styles.filterOption}>
                <svg className={`${styles.flagIcon} ${styles.mediumPriority}`} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 21V4H20L15 9L20 14H4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Medium
              </button>
              <button className={styles.filterOption}>
                <svg className={`${styles.flagIcon} ${styles.lowPriority}`} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 21V4H20L15 9L20 14H4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Low
              </button>
            </div>
          )}
        </div>
      </div>
      <hr style={{ borderColor: '#8C82FF' }} className="w-full border-t-2" />

      {/* Modified Navigation Tabs */}
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${activeTab === 'unifiedInbox' ? styles.active : ''}`}
          onClick={() => setActiveTab('unifiedInbox')}
        >
          <span className={styles.tabIcon}>✉️</span>
          Unified Inbox
        </button>
        <button 
          className={`${styles.tab} ${activeTab === 'quickResponses' ? styles.active : ''}`}
          onClick={() => setActiveTab('quickResponses')}
        >
          <span className={styles.tabIcon}>✉️</span>
          Quick Responses
        </button>
        
      </div>
      <hr style={{ borderColor: '#8C82FF', marginTop: '20px' }} className="w-full" />

      {/* Search and Metrics */}
      <div className={styles.searchSection}>
        <div className={styles.searchBar}>
          <span className={styles.searchIcon}>🔍</span>
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className={styles.metrics}>
          <span className={styles.metric}>Comments <span className={styles.count}>240</span></span>
          <span className={styles.metric}>Posts <span className={styles.count}>30</span></span>
        </div>
      </div>

      <div className={styles.cardsGrid}>
        {socialPosts.map((post, index) => (
          <SocialMediaCard 
            key={index}
            platform={post.platform}
            content={post.content}
          />
        ))}
      </div>
    </div>
  );
};
