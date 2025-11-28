import React, { useState, useEffect } from 'react';
import DashboardCard from '../../DashboardCard';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import styles from './CampaignPerformanceCard.module.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Create custom plugin for icons
const iconPlugin = {
    id: 'iconPlugin', 
    afterDraw: (chart) => {
        const ctx = chart.ctx;
        chart.data.datasets[0].data.forEach((value, index) => {
            const meta = chart.getDatasetMeta(0);
            const bar = meta.data[index];

            const iconMap = {
                'LinkedIn': '\uf08c',      // fab fa-linkedin
                'Facebook': '\uf39e',      // fab fa-facebook
                'Instagram': '\uf16d',     // fab fa-instagram
                'Twitter': '\uf099'        // fab fa-twitter
            };

            const x = bar.x;
            const y = bar.y + (bar.height / 2);
            ctx.save();
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'center';
            ctx.font = '16px "Font Awesome 5 Free"';
            ctx.fillStyle = 'white';
            ctx.fillText(iconMap[chart.data.labels[index]], x, y);
            ctx.restore();
        });
    }
};

const CampaignPerformanceCard = () => {
    const data = {
        labels: ['LinkedIn', 'Facebook', 'Instagram', 'Twitter'],
        datasets: [
            {
                label: 'Ad clicks',
                data: [500, 380, 480, 280],
                backgroundColor: ['#1565c0','#2962ff', '#d32f2f','#29b6f6'],
                borderColor: ['#1565c0', '#2962ff', '#d32f2f','#29b6f6'],
                borderWidth: 1,
                barPercentage: 0.6,
                categoryPercentage: 0.7,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                min: 0,
                max: 600,
                ticks: {
                    stepSize: 100,
                },
            },
        },
        plugins: {
            legend: {
                display: false,
                align: 'end',
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`;
                    },
                },
            },
        },
    };

    return (
        <DashboardCard className={styles['campaign-performance-card']}>
            <div className={styles['Campaign-header']}>
                <span>Campaign Management & Performance.</span>
                <a href="/Campaign" className={styles['close-button']}>
                    <button> <OpenInNewIcon className={styles['icon-btn']} /></button>
                </a>
            </div>
            <div className={styles['campcard-body']}>
                <div className={styles['bar-chart']}>
                    <Bar data={data} options={options} plugins={[iconPlugin]} />
                </div>
                <div className={styles['label-ad-clicks']}>Ad clicks</div>
            </div>
        </DashboardCard>
    );
};

export default CampaignPerformanceCard;
