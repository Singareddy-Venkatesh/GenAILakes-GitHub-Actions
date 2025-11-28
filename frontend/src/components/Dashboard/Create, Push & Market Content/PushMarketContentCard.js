"use client";

import React, { useEffect, useRef } from 'react';
import DashboardCard from '../../DashboardCard';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import styles from './PushMarketContentCard.module.css';

const PushMarketContentCard = () => {
    const gaugeRef = useRef(null);
    const totalValue = 1000;
    const currentValue = 652;

    useEffect(() => {
        const canvas = gaugeRef.current;
        const ctx = canvas.getContext("2d");
        const centerX = canvas.width / 2;
        const centerY = canvas.height - 140;
        const radius = 150;
        const gapSize = 0.08;
        const arcLineWidth = 15;

        const drawArc = (start, end, color) => {
            ctx.beginPath();
            ctx.lineWidth = arcLineWidth;
            ctx.strokeStyle = color;
            ctx.lineCap = "round";
            ctx.arc(centerX, centerY, radius, start, end, false);
            ctx.stroke();
        };

        const drawDotOnArc = (value, maxValue) => {
            const orangeStartAngle = 1.7 * Math.PI + gapSize;
            const orangeEndAngle = 1.9 * Math.PI - gapSize;
            const normalizedValue = Math.min(Math.max(value, 0), maxValue);
            const angle = orangeStartAngle + (normalizedValue / maxValue) * (orangeEndAngle - orangeStartAngle);
            const dotX = centerX + radius * Math.cos(angle);
            const dotY = centerY + radius * Math.sin(angle);

            const dotSize = 12;
            ctx.beginPath();
            ctx.arc(dotX, dotY, dotSize, 0, 2 * Math.PI);
            ctx.fillStyle = "#FFA500";
            ctx.fill();
            ctx.beginPath();
            ctx.arc(dotX, dotY, dotSize - 4, 0, 2 * Math.PI);
            ctx.fillStyle = "#FFFFFF";
            ctx.fill();
        };

        const drawFullStopsInArc = (start, end, count) => {
            const step = (end - start) / (count - 1);
            const stopRadius = 1;

            for (let i = 0; i < count; i++) {
                const angle = start + i * step;
                const dotX = centerX + radius * 0.85 * Math.cos(angle);
                const dotY = centerY + radius * 0.85 * Math.sin(angle);

                ctx.beginPath();
                ctx.arc(dotX, dotY, stopRadius, 0, 2 * Math.PI);
                ctx.fillStyle = "#000000";
                ctx.fill();
            }
        };

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const redArcStart = Math.PI;
        const redArcEnd = 1.4 * Math.PI - gapSize;
        const yellowArcStart = 1.4 * Math.PI + gapSize;
        const yellowArcEnd = 1.7 * Math.PI - gapSize;
        const orangeArcStart = 1.7 * Math.PI + gapSize;
        const orangeArcEnd = 1.9 * Math.PI - gapSize;
        const greenArcStart = 1.9 * Math.PI + gapSize;
        const greenArcEnd = 2 * Math.PI;

        const stopCount = 8;

        drawFullStopsInArc(Math.PI, 1.5 * Math.PI - gapSize, stopCount);
        drawFullStopsInArc(1.5 * Math.PI + gapSize, 2 * Math.PI, stopCount);

        drawArc(redArcStart, redArcEnd, "#FF5C5C");
        drawArc(yellowArcStart, yellowArcEnd, "#FFFF00");
        drawArc(orangeArcStart, orangeArcEnd, "#FFAA00");
        drawArc(greenArcStart, greenArcEnd, "#5DCB8A");

        drawDotOnArc(currentValue, totalValue);
    }, []);

    return (
        <DashboardCard className={styles['push-market-content-card']}>
            <div className={styles['card-header']}>
                <span>Create, Push & Market Content</span>
                <a href="/Contentpush" className={styles['expend-button']}>
                <OpenInNewIcon className={styles["icon-btn"]} />
                </a>
            </div>
            <div className={styles['card-body']}>
                <div className={`${styles.flexCol} ${styles.itemsCenter} ${styles.relative}`}>
                    <canvas ref={gaugeRef} width="450" height="300" />
                    <div
                        className={`${styles.absolute} ${styles.textCenter}`}
                        style={{
                            top: "40%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                        }}
                    >
                        <span className={`${styles.text5xl} ${styles.textBlue700} ${styles.fontBold}`}>
                            {currentValue}
                        </span>
                        <p className={`${styles.textLg} ${styles.textGray500} ${styles.fontSemibold} ${styles.mt2}`}>
                            Content Push Marketing
                        </p>
                        <p className={`${styles.textGray500} ${styles.textSm}`}>
                            Last Check on 24 Apr
                        </p>
                    </div>
                </div>
            </div>
        </DashboardCard>
    );
};

export default PushMarketContentCard;
