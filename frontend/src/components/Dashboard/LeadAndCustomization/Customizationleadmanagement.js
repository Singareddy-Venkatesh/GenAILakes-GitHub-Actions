import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { PieChart, Pie, Cell, Legend, Tooltip as PieTooltip } from "recharts";
import styles from "../../../styles/Leads/Customization.module.css"; // Correct path for CSS module
import Link from "next/link";
import { HiOutlineFilter } from "react-icons/hi";

export default function CustomizationLeadManagement() {
  const [leadData, setLeadData] = useState([]);
  const [priorityData, setPriorityData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to generate random lead data
  const generateRandomLeadData = () => {
    const randomData = [];
    for (let i = 0; i < 10; i++) {
      randomData.push({
        name: `Day ${i + 1}`,
        leads: Math.floor(Math.random() * 1000),
      });
    }
    return randomData;
  };

  // Function to generate random priority data
  const generateRandomPriorityData = () => {
    const randomData = [
      { name: "High", value: Math.floor(Math.random() * 500), color: "#FF6347" },
      { name: "Medium", value: Math.floor(Math.random() * 500), color: "#FFD700" },
      { name: "Low", value: Math.floor(Math.random() * 500), color: "#32CD32" },
    ];
    return randomData;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch lead data
        const leadsResponse = await fetch("http://localhost:8000/api/endpoints/leads");
        if (!leadsResponse.ok) {
          throw new Error(`Failed to fetch leads: ${leadsResponse.status}`);
        }
        const leads = await leadsResponse.json();
        setLeadData(leads);

        // Fetch priority data
        const priorityResponse = await fetch("http://localhost:8000/analytics/analytics/priorities");
        if (!priorityResponse.ok) {
          throw new Error(`Failed to fetch priorities: ${priorityResponse.status}`);
        }
        const priorities = await priorityResponse.json();
        setPriorityData(priorities);

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);

        // Fallback to random data when fetch fails
        setLeadData(generateRandomLeadData());
        setPriorityData(generateRandomPriorityData());
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!leadData.length || !priorityData.length) {
    return <div className="text-center">No data available</div>;
  }

  return (
    <div className="p-6">
      {/* Merged container holding both chart sections */}
      <div className={styles.mergedChartCard}>
        {/* Tab header */}
        <div className={styles.tabHeader}>
          <HiOutlineFilter className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700" />
          <h2 className={styles.tabTitle}>Customization Lead Management</h2>
          <Link href="/">
            <button
              className={styles.closeButton}
              onClick={() => console.log("Close button clicked!")}
            >
              <div className={styles.closeIcon}>
                <span></span>
                <span></span>
              </div>
            </button>
          </Link>
        </div>

        {/* Separator line */}
        <hr className={styles.separatorLine} />

        {/* Chart container: side-by-side layout */}
        <div className={styles.chartContainer}>
          <div className={styles.lineChartSection}>
            <h4 className={styles.chartTitle}>Lead Data</h4>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={leadData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="leads"
                  stroke="#6366f1"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.pieChartSection}>
            <h4 className={styles.chartTitle}>Total Priority</h4>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <PieTooltip />
                <Legend layout="vertical" align="right" verticalAlign="middle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
