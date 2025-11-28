import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import styles from './graph.module.css';
import Link from 'next/link';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Graphs = () => {
    const [statusData, setStatusData] = useState({
        'Approved': 10,
        'Published': 10,
        'Pending': 10,
        'Scheduled': 10
    });
    
    const [workflowData, setWorkflowData] = useState({
        'Twitter': 10,
        'Instagram': 7,
        'Facebook': 5,
        'LinkedIn': 3
    });

    useEffect(() => {
        fetch('http://localhost:5000/api/status-data')
            .then(res => res.json())
            .then(data => setStatusData(data))
            .catch(err => console.error(err));

        fetch('http://localhost:5000/api/workflow-data')
            .then(res => res.json())
            .then(data => setWorkflowData(data))
            .catch(err => console.error(err));
    }, []);

    const donutData = {
        labels: Object.keys(statusData),
        datasets: [{
            data: Object.values(statusData),
            backgroundColor: [
                '#79c461',
                '#1191f4',
                '#f68d2b',
                '#ffd200'
            ],
            borderWidth: 1
        }]
    };

    const barData = {
        labels: Object.keys(workflowData),
        datasets: [{
            label: 'Posts',
            data: Object.values(workflowData),
            backgroundColor: [
                '#2e2e31',
                '#fe0b60',
                '#1280d5',
                '#0077b7'
            ],
            borderWidth: 1
        }]
    };

    const barOptions = {
        indexAxis: 'y',
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: ''
            }
        },
        scales: {
            x: {
                beginAtZero: true
            }
        }
    };

    const donutOptions = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                position: 'right',
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <h2>Content Scheduler</h2>
                </div>
                <div className={styles.headerRight}>
                    <Link href="/" className={styles.closeButton}>✕</Link>
                </div>
            </div>
            <div className={styles.card}>
            
                <div className={styles.graphsContainer}>
                <div className={styles.graphBox} style={{ height: '400px', width: '100%' }}>
                        <h3 className={styles.graphTitle}>Status</h3>
                        <div className={styles.chartWrapper}>
                            <Doughnut data={donutData} options={donutOptions} />
                        </div>
                    </div>
                    <div className={styles.graphBox} style={{ height: '400px', width: '100%' }}>
                        <h3 className={styles.graphTitle}>Total Scheduler Campaign</h3>
                        <div className={styles.chartWrapper}>
                            <Bar data={barData} options={barOptions} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Graphs;