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
import styles from "../../../styles/LeadGeneration/Customization.module.css";
import Link from "next/link";
import { FaLayerGroup, FaLinkedin, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"; // Import icons

export default function CustomizationLeadManagement() {
  const [leadData, setLeadData] = useState([]);
  const [platformUsers, setPlatformUsers] = useState({});
  const [totalLeads, setTotalLeads] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

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

  const calculateTotalLeads = (data) =>
    data.reduce((sum, item) => sum + (item.leads || 0), 0);

  const calculatePlatformUsers = (users) => {
    const platformCounts = {};
    users.forEach((user) => {
      const platform = user.platform;
      if (platform && platform !== "YouTube") { // Exclude YouTube
        platformCounts[platform] = (platformCounts[platform] || 0) + 1;
      }
    });
    return platformCounts;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch leads data
        const leadsResponse = await fetch("http://127.0.0.1:8000/api/endpoints/leads");
        if (!leadsResponse.ok) {
          throw new Error(`Failed to fetch leads: ${leadsResponse.status}`);
        }
        const leads = await leadsResponse.json();
        setLeadData(leads);
        setTotalLeads(calculateTotalLeads(leads));

        // Fetch platform users data
        const usersResponse = await fetch("http://127.0.0.1:8000/users");
        if (!usersResponse.ok) {
          throw new Error(`Failed to fetch users: ${usersResponse.status}`);
        }
        const users = await usersResponse.json();
        setPlatformUsers(calculatePlatformUsers(users));

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        const randomData = generateRandomLeadData();
        setLeadData(randomData);
        setTotalLeads(calculateTotalLeads(randomData));
        setPlatformUsers({
          LinkedIn: 0,
          Facebook: 0,
          Instagram: 0,
          Twitter: 0,
        });
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!leadData.length) {
    return <div className="text-center">No data available</div>;
  }

  return (
    <div className="p-6">
      <div className={styles.mergedChartCard}>
        <div className={styles.tabHeader}>
          <FaLayerGroup className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700" />
          <h2 className={styles.tabTitle}>Lead Generation & Management</h2>
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
        <hr className={styles.separatorLine} />
        
          {/* Line Chart Section */}
          
          
          {/* Total Leads Section */}
          
            <h4 className={styles.chartTitle}>Total Leads</h4>
            <div className={styles.totalLeadsContainer}>
              <div className={styles.totalLeadsValue}>{totalLeads}</div>
              <div className={styles.platformStats}>
                {Object.entries(platformUsers).map(([platform, value]) => (
                  <div key={platform} className={styles.platformCard}>
                    {/* Platform details - Flexbox for side-by-side */}
                    <div className={styles.platformDetails}>
                      {/* Platform Icon and Name */}
                      <div className={styles.platformIcon}>
                        {platform === "LinkedIn" && <FaLinkedin style={{ color: "#0077b5" }} />}
                        {platform === "Facebook" && <FaFacebook style={{ color: "#1877f2" }} />}
                        {platform === "Instagram" && <FaInstagram style={{ color: "#e4405f" }} />}
                        {platform === "Twitter" && <FaTwitter style={{ color: "#1da1f2" }} />}
                      </div>
                      <div className={styles.platformName}>{platform}</div>
                    </div>
                    <span className={styles.platformValue}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          
            <h4 className={styles.chartTitles}>Customization Lead Management</h4>
            <div style={{ marginTop: "20px", marginLeft: "600px" }}>
              <ResponsiveContainer width="100%" height={300}>
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
          </div>
        </div>
      
    
  );
}
