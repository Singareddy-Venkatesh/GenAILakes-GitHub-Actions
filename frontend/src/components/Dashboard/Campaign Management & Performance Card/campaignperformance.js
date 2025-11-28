import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import styles from "../../../styles/Campaign/campaign.module.css"; // Updated import to use CSS Modules
import Link from "next/link";
import { FaBullhorn } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const DashboardCard = () => {
  const [adData, setAdData] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [topAds, setTopAds] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tweetId, setTweetId] = useState("");
  const [openCard, setOpenCard] = useState(null);

  
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading true at the start of fetching
      try {
        const url = tweetId
          ? `${API_BASE_URL}/api/twitter-data?tweet_id=${tweetId}`
          : `${API_BASE_URL}/api/twitter-data`;

        const [adResponse, alertsResponse, topAdsResponse, recommendationsResponse] = await Promise.all([
          fetch(url),
          fetch(`${API_BASE_URL}/api/low-roi-alerts?threshold=0.2`),
          fetch(`${API_BASE_URL}/api/top-performing-ads`),
          fetch(`${API_BASE_URL}/api/recommendations`)
        ]);
        
        // Check if each response is ok
        if (!adResponse.ok || !alertsResponse.ok || !topAdsResponse.ok || !recommendationsResponse.ok) {
          try {
            const error = await adResponse.json();
            if (error.message === 'NetworkError') {
              console.log()
              return;
            } else {
              throw error;
            }
          } catch (error) {
            console.error( error);
            toast.error();
          }
        } else {
          // If all responses are ok, get the data
          const [adData, alertsData, topAdsData, recommendationsData] = await Promise.all([
            adResponse.json(),
            alertsResponse.json(),
            topAdsResponse.json(),
            recommendationsResponse.json()
          ]);

          setAdData(adData);
          setAlerts(alertsData);
          setTopAds(topAdsData);
          setRecommendations(recommendationsData);
        }
      } catch (error) {
        console.error( error);
        toast.error();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tweetId])

  const handleCardToggle = (cardName) => {
    setOpenCard(openCard === cardName ? null : cardName);
  };

  const handleReload = () => {
    window.location.reload(); // This will reload the current page
  };

  const [platform, setPlatform] = useState('');

  const handlePlatformChange = (selectedPlatform) => {
    setPlatform(selectedPlatform);
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Breadcrumb Navigation */}
      <div className={`${styles.breadcrumbs} ${styles.textSm} ${styles.textGray600} ${styles.p4}`}>
        <Link href="/" style={{ textDecoration: 'none', color: '#28292c' }}>Dashboard</Link>
        <span className="mx-2">{" > "}</span>
        <Link href="#" onClick={handleReload} style={{ textDecoration: 'none', color: 'blue' }}>Ad Campaign Management</Link>
      </div>
      <div className={styles.headerSection}>
        <h1 className={styles.headerTitle}> <FaBullhorn style={{ marginRight: "10px" }} />Ad Campaign Management</h1>
        <Link href="/">
          <button className={styles.closeButton}>✖</button>
        </Link>
      </div>

      <div className={styles.graphSection}>
        <div className={styles.chartsContainer}>
          <div className={styles.chartWrapper}>
            <h3 className={styles.chartTitle}>Platform Metrics Breakdown</h3>
            <Bar
              data={{
                labels: adData.length > 0 ? adData.map((ad) => ad.platform) : ['No Data'],
                datasets: [
                  {
                    label: "Impressions",
                    data: adData.length > 0 ? adData.map((ad) => ad.impressions || 0) : [0],
                    backgroundColor: "#3b82f6",
                  },
                  {
                    label: "Ad Clicks",
                    data: adData.length > 0 ? adData.map((ad) => ad.ad_clicks) : [0],
                    backgroundColor: "#ef4444",
                  },
                  {
                    label: "Conversions",
                    data: adData.length > 0 ? adData.map((ad) => ad.conversions || 0) : [0],
                    backgroundColor: "#22c55e",
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  tooltip: { mode: "index", intersect: false },
                },
                scales: {
                  x: { stacked: true },
                  y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                      stepSize: 500,
                      callback: function(value) {
                        return value;
                      },
                    },
                    max: 3500,
                  },
                },
              }}
            />
          </div>
          <div className={styles.chartWrapper}>
            <h3 className={styles.chartTitle}>Trends (ROI, CTR, Conversion Rate)</h3>
            <Line
              data={{
                labels: adData.length > 0 ? adData.map((ad) => ad.platform) : ['No Data'],
                datasets: [
                  {
                    label: "ROI (%)",
                    data: adData.length > 0 ? adData.map((ad) => (ad.roi * 100).toFixed(2)) : [0],
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                  },
                  {
                    label: "CTR (%)",
                    data: adData.length > 0 ? adData.map((ad) => ad.ctr.toFixed(2)) : [0],
                    borderColor: "rgba(255, 99, 132, 1)",
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                  },
                  {
                    label: "Conversion Rate (%)",
                    data: adData.length > 0 ? adData.map((ad) => ad.conversion_rate.toFixed(2)) : [0],
                    borderColor: "rgba(53, 162, 235, 1)",
                    backgroundColor: "rgba(53, 162, 235, 0.2)",
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  tooltip: { mode: "index", intersect: false },
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    title: {
                      display: true,
                      text: "Percentage (%)",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
        <div className={styles.inputSection}>
          <label htmlFor="tweet-id">Enter Post ID:</label>
          <input
            type="text"
            id="tweet-id"
            value={tweetId}
            onChange={(e) => setTweetId(e.target.value)}
            placeholder="Enter Post ID"
          />
          <select 
            className={styles.dropdown}
            onChange={(e) => handlePlatformChange(e.target.value)}
          >
            <option value="">Select Platform</option>
            <option value="facebook">Facebook</option>
            <option value="instagram">Instagram</option>
            <option value="twitter">Twitter</option>
            <option value="linkedin">Linkedin</option>
          </select>
          <button className={styles.button} onClick={() => setTweetId(tweetId)}>Fetch Data</button>
        </div>
      </div>

      <div className={styles.alertsAndAds}>
        <div className={styles.alertSection}>
          <h2 className={styles.alertTitle} onClick={() => handleCardToggle("TopAds")}>
            Top-Performing Ads
          </h2>
          {openCard === "TopAds" && (
            <div className={styles.campaignList}>
              {topAds.length > 0 ? (
                topAds.map((ad, index) => (
                  <div key={index} className={`${styles.campaignCard} ${styles.leaderboardCard}`}>
                    <span className={styles.rankBadge}>{index + 1}</span>
                    <h3>{ad.platform} Campaign</h3>
                    <p>
                      <strong>CTR:</strong> {ad.ctr.toFixed(2)}%
                    </p>
                    <p>
                      <strong>Conversion Rate:</strong> {ad.conversion_rate.toFixed(2)}%
                    </p>
                  </div>
                ))
              ) : (
                <p>No top-performing ads found.</p>
              )}
            </div>
          )}
        </div>

        <div className={styles.alertSection}>
          <h2 className={styles.alertTitle} onClick={() => handleCardToggle("LowROI")}>
            Low ROI Campaign Alerts
          </h2>
          {openCard === "LowROI" && (
            <div className={styles.alertList}>
              {alerts.length > 0 ? (
                alerts.map((alert, index) => (
                  <div key={index} className={styles.alertCard}>
                    <h3>{alert.platform} Campaign</h3>
                    <p>
                      <strong>ROI:</strong> {(alert.roi * 100).toFixed(2)}%
                    </p>
                    <p>Suggested Action: Optimize content for better ROI.</p>
                  </div>
                ))
              ) : (
                <p>No low ROI campaigns found.</p>
              )}
            </div>
          )}
        </div>

        <div className={styles.recommendationsSection}>
          <h2 className={styles.recommendationsTitle} onClick={() => handleCardToggle("Recommendations")}>
            Campaign Recommendations
          </h2>
          {openCard === "Recommendations" && (
            <div className={styles.recommendationsList}>
              {recommendations.length > 0 ? (
                recommendations.map((recommendation, index) => (
                  <div key={index} className={styles.recommendationCard}>
                    <h3>{recommendation.platform} Campaign</h3>
                    <p>
                      <strong>Suggested Action:</strong> {recommendation.suggested_budget_increase}
                    </p>
                    <p>
                      <strong>Best Practice:</strong> {recommendation.best_practice}
                    </p>
                  </div>
                ))
              ) : (
                <p>No recommendations available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
