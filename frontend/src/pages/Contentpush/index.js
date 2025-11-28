import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Chart, registerables } from "chart.js";
import styles from "../../styles/Contentpush/content.module.css"; // Adjust path as necessary
import Navbar from "../../components/Layout/Navbar";
import Sidebar from "../../components/Layout/Sidebar";

// Register Chart.js components at the top level
Chart.register(...registerables);

const GaugeChart = () => {
  const gaugeRef = useRef(null);

  useEffect(() => {
    const canvas = gaugeRef.current;
    const ctx = canvas.getContext("2d");
    const centerX = canvas.width / 2;
    const centerY = canvas.height - 140;
    const radius = 150;
    const gapSize = 0.08;
    const arcLineWidth = 15;

    // Function to draw arcs
    const drawArc = (start, end, color) => {
      ctx.beginPath();
      ctx.lineWidth = arcLineWidth;
      ctx.strokeStyle = color;
      ctx.lineCap = "round";
      ctx.arc(centerX, centerY, radius, start, end, false);
      ctx.stroke();
    };

    // Draw dot on arc
    const drawDotOnArc = (value, maxValue) => {
      const orangeStartAngle = 1.7 * Math.PI + gapSize;
      const orangeEndAngle = 1.9 * Math.PI - gapSize;

      const normalizedValue = Math.min(Math.max(value, 0), maxValue);
      const angle =
        orangeStartAngle + (normalizedValue / maxValue) * (orangeEndAngle - orangeStartAngle);
      const dotX = centerX + radius * Math.cos(angle);
      const dotY = centerY + radius * Math.sin(angle);

      const dotSize = 12;
      ctx.beginPath();
      ctx.arc(dotX, dotY, dotSize, 0, 2 * Math.PI);
      ctx.fillStyle = "#FFA500"; // Dot color
      ctx.fill();
      ctx.beginPath();
      ctx.arc(dotX, dotY, dotSize - 4, 0, 2 * Math.PI);
      ctx.fillStyle = "#FFFFFF"; // Inner circle color
      ctx.fill();
    };

    // Draw full stops in arc
    const drawFullStopsInArc = (start, end, count) => {
      const step = (end - start) / (count - 1);
      const stopRadius = 1;

      for (let i = 0; i < count; i++) {
        const angle = start + i * step;
        const dotX = centerX + radius * 0.85 * Math.cos(angle);
        const dotY = centerY + radius * 0.85 * Math.sin(angle);

        ctx.beginPath();
        ctx.arc(dotX, dotY, stopRadius, 0, 2 * Math.PI);
        ctx.fillStyle = "#000000"; // Stop color
        ctx.fill();
      }
    };

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Define arcs
    const redArcStart = Math.PI;
    const redArcEnd = 1.4 * Math.PI - gapSize;
    const yellowArcStart = 1.4 * Math.PI + gapSize;
    const yellowArcEnd = 1.7 * Math.PI - gapSize;
    const orangeArcStart = 1.7 * Math.PI + gapSize;
    const orangeArcEnd = 1.9 * Math.PI - gapSize;
    const greenArcStart = 1.9 * Math.PI + gapSize;
    const greenArcEnd = 2 * Math.PI;

    const stopCount = 8;

    // Draw stops and arcs
    drawFullStopsInArc(Math.PI, 1.5 * Math.PI - gapSize, stopCount);
    drawFullStopsInArc(1.5 * Math.PI + gapSize, 2 * Math.PI, stopCount);

    drawArc(redArcStart, redArcEnd, "#FF5C5C");
    drawArc(yellowArcStart, yellowArcEnd, "#FFFF00");
    drawArc(orangeArcStart, orangeArcEnd, "#FFAA00");
    drawArc(greenArcStart, greenArcEnd, "#5DCB8A");

    const value = 652; // Sample value
    const maxValue = 1000;
    drawDotOnArc(value, maxValue);
  }, []);

  return (
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
        <span className={`${styles.text5xl} ${styles.textBlue700} ${styles.fontBold}`}>652</span>
        <p className={`${styles.textLg} ${styles.textGray500} ${styles.fontSemibold} ${styles.mt2}`}>
          Content Push Marketing
        </p>
        <p className={`${styles.textGray500} ${styles.textSm}`}>Last Check on 24 Apr</p>
      </div>
    </div>
  );
};

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar starts open by default.
  const barChartRef = useRef(null);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const ctx = barChartRef.current.getContext("2d");
    if (!ctx) return;

    const barChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["Posts", "Reels", "Videos", "Blogs"],
        datasets: [
          {
            label: "Content Types",
            data: [500, 150, 100, 50],
            backgroundColor: ["#0000FF", "#74B72E", "#FFA500", "#FFB6C1"],
            borderRadius: 5,
            barThickness: 100,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false } },
          y: {
            beginAtZero: true,
            max: 600,
            grid: { display: false },
          },
        },
      },
    });

    return () => {
      if (barChartInstance) {
        barChartInstance.destroy();
      }
    };
  }, []);

  // Function to handle page reload
  const handleReload = () => {
    window.location.reload(); // This will reload the current page
  };

  return (
    <div className={'${styles.bgGradient} ${styles.maincontainer}' }>
      {/* Navbar */}
      <div className="navHeader">
        <Navbar toggleSidebar={handleSidebarToggle} />
      </div>
      {/* Layout with Sidebar and Campaign Performance Card */}
      <div className="main-layout">
        <Sidebar
          className="sidebarele"
          isOpen={isSidebarOpen}
          toggleSidebar={handleSidebarToggle}
        />
        <div className={`${styles.flexGrow} ${styles.flexCol} ${styles.p6}`}>
          {/* Breadcrumb Navigation */}
          <div className={`${styles.breadcrumbs} ${styles.textSm} ${styles.textGray600} ${styles.p4}`}>
            <Link href="/" style={{ textDecoration: 'none', color: '#28292c' }}>Dashboard</Link>
            <span className="mx-2">{" > "}</span>
            <Link href="#" onClick={handleReload} style={{ textDecoration: 'none', color: 'blue' }}>Create, Push & Market Content</Link>
          </div>
          

          {/* Remove white background container here */}
          {/* Tab header */}
        <div className={styles.tabHeader}>
          <h2 className={styles.tabTitle}>📄 Create, Push & Market Content</h2>
          <Link href="/">
            <button className={styles.closeButton}>✖</button>
          </Link>
        </div>
        <div className={`${styles.mt6}`}>
            <div className={`${styles.bgpurple} ${styles.shadowMd} ${styles.roundedLg} ${styles.p4}`}>
              <div className={`${styles.flex} ${styles.justifyAround}`}>
                <div className={`${styles.w1/2}`}>
                  <GaugeChart />
                </div>
                <div className={`${styles.w1/2}`}>
                  <canvas ref={barChartRef} className={`${styles.wFull} ${styles.hFull}`} width="650" height="200" />
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.mt6} ${styles.flex} ${styles.justifyBetween} ${styles.itemsCenter}`}>
            <p className={`${styles.textPurple600} ${styles.fontSemibold} ${styles.flex} ${styles.itemsCenter}`}>
              <span className="mr-2">📊</span> Ad Campaign
            </p>
            <Link href="/Details" legacyBehavior>
              <button className={`${styles.createButton}`}>
                + Create Campaign
              </button>
            </Link>
          </div>

          {/* Line Below Ad Campaign */}
          <div className={`${styles.my4}`} style={{ height: '2px', backgroundColor: '#4A90E2', width: '100%', margin: '20px 0' }} />

          <div className={`${styles.mt4} ${styles.wFull} ${styles.maxW4xl} ${styles.mxAuto}`}>
            <div className={`${styles.relative}`}>
              <input
                type="text"
                placeholder="Search"
                className={`${styles.w1/3} ${styles.roundedFull} ${styles.border} ${styles.borderGray300} ${styles.px3} ${styles.py1} ${styles.pl8} ${styles.textSm} ${styles.textGray500} ${styles.shadowSm} ${styles.focusOutlineNone} ${styles.focusRing2} ${styles.focusRingBlue300}`}
              />
              <span className={`${styles.absolute} ${styles.left1} ${styles.top1/2} transform -translate-y-1/2 ${styles.textGray400}`}>
                🔍
              </span>
            </div>
          </div>

          {/* Posts Section Without White Background Container */}
          {Array.from({ length: 5 }).map((_, index) => {
            const commonPost = {
              title: "Untitled" + (index > 0 ? "-" + index : ""),
              description: "Social Post - X Twitter",
              scheduledDate: "Tue, NOV 29th 11:45 am",
              status:
                index % 2 === 0
                  ? "Published"
                  : index % 3 === 0
                  ? "Scheduled"
                  : "Draft",
              statusStyle:
                index % 2 === 0
                  ? `${styles.statusPublished}`
                  : index % 3 === 0
                  ? `${styles.statusScheduled}`
                  : `${styles.statusDraft}`,
            };

            return (
              <div
                className={`${styles.flex} ${styles.itemsCenter} ${styles.justifyBetween} ${styles.px6} ${styles.py4} ${styles.borderBottom}`}
                key={index} // Ensure each child has a unique key
              >
                <div>
                  <h3 className={`${styles.postTitle} ${styles.textBlue}`}>{commonPost.title}</h3>
                  <p className={styles.postDescription}>{commonPost.description}</p>
                  <p className={styles.postSchedule}>{`Scheduled for ${commonPost.scheduledDate}`}</p>
                </div>
                <span
                  className={`${commonPost.statusStyle} ${styles.status}`}
                >
                  {commonPost.status}
                </span>
                <button
                  className={`${styles.editButton} ${styles.hoverButton}`}
                >
                  Edit
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;