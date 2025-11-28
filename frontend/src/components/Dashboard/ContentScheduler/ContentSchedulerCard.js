import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import styles from './ContentSchedulerCard.module.css';
 
const data = [
  { name: "Approved", value: 25, color: "#4CAF50" },
  { name: "Published posts", value: 25, color: "#1976D2" },
  { name: "Pending", value: 25, color: "#FFEB3B" },
  { name: "Scheduled posts", value: 25, color: "#FF9800" }
];

const ContentScheduler = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <CalendarMonthIcon className={styles.icon} />
          <span>Content Scheduler</span>
        </div>
        <a href="/ContentScheduler" className={styles['close-button']}>
          <OpenInNewIcon className={styles["icon-btn"]} />
        </a>
      </div> 

      <div className={styles.chartContainer}>
        <div className={styles.chartWrapper}>
          <PieChart width={250} height={250}>
            <Pie
              data={data}
              dataKey="value"
              cx="40%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={5}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          </div>

          <div className={styles.legend}>
            {data.map((item, index) => (
              <div key={`legend-${index}`} className={styles.legendItem}>
                <div
                  className={styles.legendColor}
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
              </div>
            ))}
          
        </div>
      </div>
    </div>
  );
};

export default ContentScheduler;
