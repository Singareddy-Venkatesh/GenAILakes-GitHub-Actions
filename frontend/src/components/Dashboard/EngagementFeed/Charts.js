import React from "react";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
} from "chart.js";
import { Doughnut, Bar } from "react-chartjs-2";
import CloseIcon from '@mui/icons-material/Close';
import styles from "../../../styles/Engagementfeed/Charts.module.css";
import { Flex } from "antd";
import Link from "next/link";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const Charts = ({ engagementData }) => {
  // Define chartOptions
  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          boxWidth: 10,
          font: {
            size: 11
          }
        }
      }
    }
  };

  // Data for Comments Donut Chart
  const donutChartData = {
    labels: ['Unanswered Comments', 'Answered Comments'],
    datasets: [
      {
        data: [70, 20], // Unanswered: 70, Answered: 20
        backgroundColor: ['#4361EE', '#4CAF50'],
        borderWidth: 0,
      },
    ],
  };

  // Custom options for donut chart
  const donutOptions = {
    ...chartOptions,
    cutout: '75%',
    plugins: {
      ...chartOptions.plugins,
      legend: {
        position: 'bottom',
      },
      // Add center text plugin
      centerText: {
        display: true,
        text: '90\nTOTAL\nCOMMENTS'
      }
    }
  };

  // Data for Engagement Bar Chart
  const barChartData = {
    labels: ['Followers', 'Likes', 'Dislikes'],
    datasets: [
      {
        data: [500, 300, 200],
        backgroundColor: ['#4361EE', '#4CAF50', '#FFA726'],
        borderRadius: 4,
      },
    ],
  };

  // Custom options for bar chart
  const barOptions = {
    ...chartOptions,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
    <div className={styles.chartsCard}>
      {/* Added Navigation Bar */}
      <div className={styles.navBar}>
        <div className={styles.navTitle}>
          <span className={styles.navIcon}>📱</span>
          <h2>Engagement & interaction Feed</h2>
        </div>
        <Link href="/" className={styles.closeButton}>
          <CloseIcon />
        </Link>
        
      </div>

      {/* Existing Charts Content */}
      <div className={styles.chartsContainer}>
        <div className={styles.chartItem}>
          <div className={styles.chartWrapper}>
            <div className={styles.donutChartContainer}>
              <Doughnut data={donutChartData} options={donutOptions} />
              <div className={styles.centerStats}>
                <div className={styles.totalNumber}>90</div>
                <div className={styles.totalLabel}>
                  TOTAL<br />COMMENTS
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.chartItem}>
          <div className={styles.chartWrapper}>
            <Bar data={barChartData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Charts;
