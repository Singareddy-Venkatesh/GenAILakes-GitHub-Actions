"use client";
import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import KeywordsTrendsCard from '../components/Dashboard/YourKeywords/KeywordsTrendsCard';
import CompetitorKeywordsCard from '../components/Dashboard/CompitatorKeywords/CompitorKeyCard';
import PushMarketContentCard from '../components/Dashboard/Create, Push & Market Content/PushMarketContentCard';
import CampaignPerformanceCard from '../components/Dashboard/Campaign Management & Performance Card/CampaignPerformanceCard';
import EngagementFeedCard from '../components/Dashboard/EngagementFeed/EngagementFeedCard';
import SocialMediaInboxCard from '../components/Dashboard/SocialMediaInbox/SocialMediaInboxCard';
import ContentSchedulerCard from '../components/Dashboard/ContentScheduler/ContentSchedulerCard';
import LeadOverviewCard from '../components/Dashboard/LeadAndCustomization/LeadAndCustomizationCard';
import DashboardHeader from '../components/Dashboard/DashboardHeader/DashboardHeader';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import styles from "../styles/Dashboard/Dashboardpage.module.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const DashboardPage = () => {
  const [layout, setLayout] = useState([
    { i: 'keywords', x: 0, y: 0, w: 6, h: 3 },  // 2 cards in first row (6 columns)
    { i: 'competitor', x: 6, y: 0, w: 6, h: 3 },
    { i: 'pushMarket', x: 0, y: 3, w: 6, h: 3 },  // 2 cards in second row (6 columns)
    { i: 'campaign', x: 6, y: 3, w: 6, h: 3 },
    { i: 'engagement', x: 0, y: 6, w: 4, h: 3 },  // 3 cards in third row (4 columns per card)
    { i: 'social', x: 4, y: 6, w: 4, h: 3 },
    { i: 'scheduler', x: 8, y: 6, w: 4, h: 3 },
    { i: 'lead', x: 0, y: 9, w: 12, h: 3 }  // 1 card in the fourth row (12 columns)
  ]);

  const [highlightedPosition, setHighlightedPosition] = useState(null);

  const [visibleCards, setVisibleCards] = useState({
    keywords: true,
    competitor: true,
    pushMarket: true,
    campaign: true,
    engagement: true,
    social: true,
    scheduler: true,
    lead: true
  });

  const toggleCard = (cardId) => {
    setVisibleCards((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }));
  };

  const onDragStop = (layout) => {
    setLayout(layout);
  };

  const handleDragMove = (layout, oldItem, newItem) => {
    // Define allowed x positions: Only allow 0, 6, and 12 (representing 2 cards in each row)
    const allowedXPositions = [0, 6, 12];

    // Check if the dragged item is in the allowed x positions
    const nearestX = allowedXPositions.reduce((prev, curr) =>
      Math.abs(curr - newItem.x) < Math.abs(prev - newItem.x) ? curr : prev
    );

    // Set the position to the nearest allowed x position
    newItem.x = nearestX;

    // Highlight the position the item is being dragged into
    setHighlightedPosition(newItem.x);

    // Dynamically adjust the card width based on the row it is dragged to
    const rowHeight = 3; // Assuming each row has a height of 3 units

    if (newItem.y === 0 || newItem.y === 3) {
      // First and second row - 2 cards per row
      newItem.w = 6;
    } else if (newItem.y === 6) {
      // Third row - 3 cards per row
      newItem.w = 4;
    } else if (newItem.y === 9) {
      // Fourth row - 1 card per row
      newItem.w = 12;
    }
  };

  return (
    <div className={styles.dashboardWrapper}>
      <div className={styles.dashHeader}>
        <DashboardHeader />
      </div>
      <div className={styles.dashboardContainer}>
        <ResponsiveGridLayout
          className={styles.layout}
          layouts={{ lg: layout }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }} // 12 columns, split as needed
          rowHeight={100}
          margin={[16, 16]}
          containerPadding={[5, 2]}
          // isResizable={true}
          isDraggable={true}
          onDragStop={onDragStop}
          onDrag={handleDragMove}
        >
          {visibleCards.keywords && (
            <div
              key="keywords"
              // className={`${styles.gridItem} ${highlightedPosition === 0 ? styles.highlighted : ''}`}
            >
              <KeywordsTrendsCard onClose={() => toggleCard('keywords')} />
            </div>
          )}
          {visibleCards.competitor && (
            <div
              key="competitor"
              //className={`${styles.gridItem} ${highlightedPosition === 6 ? styles.highlighted : ''}`}
            >
              <CompetitorKeywordsCard onClose={() => toggleCard('competitor')} />
            </div>
          )}
          {visibleCards.pushMarket && (
            <div
              key="pushMarket"
              //className={`${styles.gridItem} ${highlightedPosition === 0 ? styles.highlighted : ''}`}
            >
              <PushMarketContentCard onClose={() => toggleCard('pushMarket')} />
            </div>
          )}
          {visibleCards.campaign && (
            <div
              key="campaign"
              //className={`${styles.gridItem} ${highlightedPosition === 6 ? styles.highlighted : ''}`}
            >
              <CampaignPerformanceCard onClose={() => toggleCard('campaign')} />
            </div>
          )}
          {visibleCards.engagement && (
            <div
              key="engagement"
              //className={`${styles.gridItem} ${highlightedPosition === 0 ? styles.highlighted : ''}`}
            >
              <EngagementFeedCard onClose={() => toggleCard('engagement')} />
            </div>
          )}
          {visibleCards.social && (
            <div
              key="social"
              //className={`${styles.gridItem} ${highlightedPosition === 4 ? styles.highlighted : ''}`}
            >
              <SocialMediaInboxCard onClose={() => toggleCard('social')} />
            </div>
          )}
          {visibleCards.scheduler && (
            <div
              key="scheduler"
              //className={`${styles.gridItem} ${highlightedPosition === 8 ? styles.highlighted : ''}`}
            >
              <ContentSchedulerCard onClose={() => toggleCard('scheduler')} />
            </div>
          )}
          {visibleCards.lead && (
            <div
              key="lead"
              //className={`${styles.gridItem} ${highlightedPosition === 0 ? styles.highlighted : ''}`}
            >
              <LeadOverviewCard onClose={() => toggleCard('lead')} />
            </div>
          )}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};

export default DashboardPage;
