import React from "react";
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import styles from './CompetitorKeywordsCard.module.css';
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

const CompetitorTrends = () => {
  const data = {
    labels: ['LinkedIn', 'Facebook', 'Instagram', 'Twitter', 'YouTube', 'Share chat'],
    datasets: [{
      label: 'Platform Engagement',
      data: [74779, 56635, 43887, 19027, 8142, 4918],
      backgroundColor: [
        '#0077B5', '#4267B2', '#E1306C', '#1DA1F2', '#FF0000', '#00B87C'
      ],
      borderWidth: 0,
      barThickness: 8,
    }]
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: '#333',
        font: {
          weight: 'bold',
          size: 12,
        },
        formatter: (value) => value.toLocaleString(),
        padding: 6,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#666',
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#666',
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className={styles['competitor-container']}>
      <div className={styles.header}>
        <div className={styles['header-title']}>
          <TrendingUpIcon className={styles.icon} />
          <span>Your Competitor Keywords, Trends</span>
        </div>
        <a href="/Competitors" >
        <OpenInNewIcon className={styles["icon-btn"]} />
        </a>
      </div>
      
      <div className={styles['chart-container']} style={{ height: '250px' }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default CompetitorTrends;
