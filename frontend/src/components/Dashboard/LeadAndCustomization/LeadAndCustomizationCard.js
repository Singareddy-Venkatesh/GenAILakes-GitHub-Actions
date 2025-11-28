import React from "react";
import { Line } from "react-chartjs-2";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import styles from "./LeadOverview.module.css";

// Chart.js configuration
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LeadOverview = () => {
  // Graph data
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    datasets: [
      {
        label: "Total Leads",
        data: [100, 200, 300, 400, 320, 500, 402],
        borderColor: "#2b52ff",
        backgroundColor: "rgba(43, 82, 255, 0.2)",
        tension: 0.3,
        pointBackgroundColor: "#fff",
        pointBorderColor: "#2b52ff",
        pointHoverBackgroundColor: "#2b52ff",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return ` ${context.raw} Leads`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 700,
        ticks: { stepSize: 100 },
      },
    },
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.icon}>📊 Lead Generation Overview </span>
     
      <a href="/Leads" >
        <OpenInNewIcon className={styles["icon-btn"]} />
        </a>
        </header>

      <div className={styles.content}>
        {/* Left Section */}
        <div className={styles.totalLeadsSection}>
          <div className={styles.total}><h3>Total Leads</h3> 
          <div className={styles.totalLeadsNumber}>3205</div>
          </div>
          <div className={styles.socialMediaBar}>
            <span className={styles.linkedin}></span>
            <span className={styles.facebook}></span>
            <span className={styles.instagrambar}></span>
            <span className={styles.twitter}></span>
          </div>

          <div className={styles.socialMediaStats}>
            <div className={styles.statBox}>
              <span className={styles.linkedinIcon}>🔗 LinkedIn</span>
              <div className={styles.statNumber}>2203</div>
            </div>
            <div className={styles.statBox}>
              <span className={styles.facebookIcon}>📘 Facebook</span>
              <div className={styles.statNumber}>320</div>
            </div>
            <div className={styles.statBox}>
              <span className={styles.instagramIcon}>📸 Instagram </span>
              <div className={`${styles.statNumber} ${styles.danger}`}>321</div>
            </div>
            <div className={styles.statBox}>
              <span className={styles.twitterIcon}>🐦 Twitter </span>
              <div className={styles.statNumber}>562</div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        
        <div className={styles.graphSection}>
        
          <h3>Customization Lead Management</h3>
          <div className={styles.graph}>
          
            <Line data={data} options={options} />
            <div className={styles.graphLabel}>
            <span>Total Leads</span>
            <span className={styles.highlightNumber}>402</span>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadOverview;
