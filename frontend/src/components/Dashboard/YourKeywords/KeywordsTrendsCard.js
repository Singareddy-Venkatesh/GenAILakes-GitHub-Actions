import React, { useRef, useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import styles from "./KeywordsTrendsCard.module.css";
import NotesIcon from "@mui/icons-material/Notes";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const data = [
  { name: "Ideas and Inspiration", value: 45, color: "#F44336" },
  { name: "To create Outline", value: 31, color: "#FFC107" },
  { name: "To draft content", value: 18, color: "#673AB7" },
  { name: "To write content", value: 6, color: "#4CAF50" },
];

const InsightsChart = () => {
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0, outerRadius: 0 });

useEffect(() => {
  const updateDimensions = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;

      const size = Math.min(containerWidth, containerHeight) * 0.7; // 70% of the smallest dimension
      const clampedSize = Math.max(150, Math.min(size, 300)); // Clamp size between 150px and 300px
      setDimensions({
        width: containerWidth,
        height: containerHeight,
        outerRadius: clampedSize / 2,
      });
    }
  };

  updateDimensions();
  window.addEventListener("resize", updateDimensions);
  return () => window.removeEventListener("resize", updateDimensions);
}, []);

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 1.2;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text
        x={x}
        y={y}
        fill="black"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: "12px" }}
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className={styles["insights-container"]}>
      <div className={styles.header}>
        <div className={styles["header-title"]}>
          <NotesIcon className={styles.icon} />
          <span>Your Keywords, Trends, Insights</span>
        </div>
        
        <a href="/Keywords_Trends" className={styles["close-button"]}>
          <OpenInNewIcon className={styles["icon-btn"]} />
        </a>
      </div>

      <div
  className={styles['chart-container']}
  ref={containerRef} // Reference to the container
>
  <PieChart
    width={dimensions.width} // Adjust dynamically
    height={dimensions.height * 0.7} // Use 70% of the height for the chart
  >
    <Pie
      data={data}
      dataKey="value"
      cx="50%"
      cy="50%"
      outerRadius={dimensions.outerRadius}
      labelLine={true}
      label={renderCustomLabel}
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={entry.color} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>

  {/* Label container */}
  <div className={styles.labels}>
    {data.map((item, index) => (
      <div key={index} className={styles['label-item']}>
        <span style={{ color: item.color, fontWeight: "bold" }}>
          {item.value}%
        </span>
        <span>{item.name}</span>
      </div>
    ))}
  </div>
</div>

    </div>
  );
};

export default InsightsChart;
