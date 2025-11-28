import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import styles from './DonutChart.module.css';

// Register required Chart.js components for both charts
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

// DonutChart for Doughnut chart
export const DonutChart = () => {
  const data = {
    labels: ['Taglines', 'Keywords', 'Hashtags'],
    datasets: [{
      data: [25, 30, 45],
      backgroundColor: ['#FFCC00', '#F76659', '#00C7BE'],
      borderWidth: 0 // No border around the slices
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow for flexible sizing
    rotation: 180, // Rotating the donut chart
    plugins: {
      legend: {
        position: 'bottom',
        labels: { 
          padding: 20, // Spacing between legend items
          font: { size: 14 } // Font size for the legend labels
        }
      },
      datalabels: {
        color: '#fff',
        font: { weight: 'bold', size: 16 },
        formatter: (value) => `${value}%`
      }
      
    }
  };

  return (
    <div className={styles.chartWrapper}>
      <Doughnut data={data} options={options} />
    </div>
  );
};

// ComparisonChart for Bar chart
export const ComparisonChart = () => {
  const data = {
    labels: ['LinkedIn', 'Facebook', 'Instagram', 'Twitter', 'YouTube', 'ShareChat'],
    datasets: [{
      label: 'Platform Engagement',
      data: [74779, 56635, 43887, 19027, 8142, 4918],
      backgroundColor: [
        '#0077B5', '#4267B2', '#E1306C', '#1DA1F2', '#FF0000', '#FFE812',
      ],
      borderWidth: 0, // Removes the border around bars
      barThickness: 8, // Adjusts bar thickness
    }]
  };

  const options = {
    indexAxis: 'y', // Makes the chart horizontal
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hides the legend
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: '#333',
        font: {
          weight: 'bold',
          size: 12,
        },
        formatter: (value) => value.toLocaleString(), // Formats numbers with commas
        padding: 6,
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Removes gridlines
        },
        ticks: {
          color: '#666', // Sets tick color
        },
      },
      y: {
        grid: {
          display: false, // Removes gridlines
        },
        ticks: {
          color: '#666', // Sets tick color
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className={styles.chartWrapper} style={{ height: '300px' }}>
      <Bar data={data} options={options} />
    </div>
  );
};