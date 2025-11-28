"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaHome,
  FaChartLine,
  FaUsers,
  FaRegEdit,
  FaBullhorn,
  FaEnvelope,
  FaLayerGroup,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdExpandMore } from "react-icons/md";
import { FaBars } from "react-icons/fa"; // Hamburger icon

import styles from "../../styles/Sidebar/Sidebar.module.css";

const navigationItems = [
  {
    icon: <FaHome />,
    label: "Dashboard",
    path: "/",
  },
  {
    icon: <FaChartLine />,
    label: "Keyword Trends",
    path: "../Keywords_Trends",
  },
  {
    icon: <FaUsers />,
    label: "Competitor",
    path: "../Competitors",
  },
  {
    icon: <FaRegEdit />,
    label: "Content Push",
    path: "../Contentpush",
  },
  {
    icon: <FaBullhorn />,
    label: "Ad Campaign",
    path: "../Campaign",
  },
  {
    icon: <FaEnvelope />,
    label: "Interaction Feed",
    path: "../Engagement_Feed",
  },
  {
    icon: <FaLayerGroup />,
    label: "Lead Generation",
    path: "../LeadsGeneration",
  },
  {
    icon: <FaEnvelope />,
    label: "Social Inbox",
    path: "../SocialInbox",
    hasDropdown: true,
    dropdownItems: [
      { label: "Inbox High", path: "../../../SocialInbox/high" },
      { label: "Inbox Medium", path: "../../../SocialInbox/medium" },
      { label: "Inbox Low", path: "../../../SocialInbox/low" },
    ],
  },
  {
    icon: <FaUsers />,
    label: "Leads",
    path: "../Leads",
    hasDropdown: true,
    dropdownItems: [
      { label: "Leads High", path: "../Leads/high" },
      { label: "Leads Medium", path: "../Leads/medium" },
      { label: "Leads Low", path: "../Leads/low" },
    ],
  },
  {
    icon: <FaCalendarAlt />,
    label: "Content Scheduler",
    path: "../ContentScheduler",
  },
];

const NavItem = ({
  icon,
  label,
  path,
  hasDropdown,
  dropdownItems,
  isCollapsed,
}) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleItemClick = () => {
    if (path) {
      router.push(path);
    }
    if (hasDropdown && !isCollapsed) {
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <div className={styles.navItem}>
      <div className={styles.navItemContent} onClick={handleItemClick}>
        <span className={styles.navItemIcon}>{icon}</span>
        {!isCollapsed && (
          <>
            <span className={styles.navItemLabel}>{label}</span>
            {hasDropdown && <MdExpandMore className={styles.dropdownIcon} />}
          </>
        )}
      </div>
      {hasDropdown && isDropdownOpen && !isCollapsed && (
        <div className={styles.dropdownMenu}>
          {dropdownItems.map((item, index) => (
            <div
              key={index}
              className={styles.dropdownItem}
              onClick={() => router.push(item.path)}
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  return (
    <div
      className={`${styles.sidebarContainer} ${
        isCollapsed ? styles.collapsed : ""
      }`}
    >
      {/* Hamburger Button */}
      <div className={styles.hamburgerButton} onClick={toggleSidebar}>
        <FaBars />
      </div>

      {/* Navigation Items */}
      {navigationItems.map((item, index) => (
        <NavItem
          key={index}
          icon={item.icon}
          label={item.label}
          path={item.path}
          hasDropdown={item.hasDropdown}
          dropdownItems={item.dropdownItems || []}
          isCollapsed={isCollapsed}
        />
      ))}
    </div>
  );
};

const SidebarContainer = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className={styles.container}>
      <Sidebar isCollapsed={isSidebarCollapsed} toggleSidebar={toggleSidebar} />
    </div>
  );
};

export default SidebarContainer;
