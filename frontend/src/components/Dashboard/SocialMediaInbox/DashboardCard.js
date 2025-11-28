import React, { useState, useEffect } from 'react';
import { IoMailUnreadOutline, IoCloseOutline } from 'react-icons/io5';
import { Pie, Bar } from 'react-chartjs-2';
import styles from '../../../styles/SocialInbox/Dashboard.module.css';
import CardBoard from './CardBoard';
import Link from 'next/link';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardCard = () => {
  const [isClient, setIsClient] = useState(false);
  const [messageStats, setMessageStats] = useState({
    highPriority: 60,
    regular: 40,
    priorityBreakdown: {
      high: 74779,
      medium: 56635,
      low: 43887
    }
  });

  useEffect(() => {
    setIsClient(true);
    // Here you can add API calls to fetch real message statistics
  }, []);

  const messageData = {
    labels: ['High-priority-message', 'Message'],
    datasets: [{
      data: [messageStats.highPriority, messageStats.regular],
      backgroundColor: ['#F6E18E', '#00C7BE'],
      label: 'Messages',
      borderWidth: 0
    }]
  };

  const priorityData = {
    labels: ['High', 'Medium', 'Low'],
    datasets: [{
      data: [
        messageStats.priorityBreakdown.high,
        messageStats.priorityBreakdown.medium,
        messageStats.priorityBreakdown.low
      ],
      backgroundColor: ['#FF4D4D', '#FFA500', '#4CAF50'],
      borderRadius: 20,
      barThickness: 20,
      barPercentage: 0.5,
      categoryPercentage: 0.2,
    }]
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          padding: 20,
          font: { size: 12 }
        }
      }
    }
  };

  const barOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw.toLocaleString()} messages`
        }
      }
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `${(value / 1000).toFixed(1)}k`,
          font: { size: 12 }
        },
        grid: {
          color: '#E5E5E5',
          drawBorder: false,
          lineWidth: 1
        }
      },
      y: {
        ticks: {
          font: {
            size: 14,
            weight: 'bold'
          },
          padding: 10
        },
        grid: { display: false }
      }
    },
    layout: {
      padding: {
        top: 20,
        bottom: 0,
        left: 20,
        right: 20
      }
    }
  };

  const handleClose = () => {
    // Add close functionality here
    console.log('Dashboard closed');
  };
  const handleReload = () => {
    window.location.reload(); // This will reload the current page
  };

  return (
    <div className={styles.container}>
      {isClient && (
        <div className={styles.card}>
          <div className={styles.topBar}>
            <div className={styles.leftSection}>
              <IoMailUnreadOutline className={styles.icon} />
              <h2 className={styles.topheading}>Social Media Inbox</h2>
            </div>
          <Link href="/">
            <button>✖</button>
          </Link>
          </div>
          <div className={styles.content}>
            <h3 className={styles.cardheading}>Total Priority Messages</h3>
            <div className={styles.chartsContainer}>
              <div className={styles.pieChartContainer}>
                <Pie data={messageData} options={pieOptions} />
              </div>
              <div className={styles.barChartContainer}>
                <Bar data={priorityData} options={barOptions} />
              </div>
            </div>
          </div>
        </div>
      )}
      {isClient && <CardBoard />}
    </div>
  );
};

export default DashboardCard;
