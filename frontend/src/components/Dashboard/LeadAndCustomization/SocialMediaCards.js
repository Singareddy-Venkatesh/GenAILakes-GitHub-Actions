"use client";

import React, { useEffect, useState } from "react";
import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import { HiOutlineFilter } from "react-icons/hi";
import styles from "/src/styles/Leads/Socialmediacard.module.css";

const API_URL = "http://localhost:8000";

const fetchUsers = async () => {
  try {
    const response = await fetch(`${API_URL}/users`);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

const generateRandomUsers = () => {
  const platforms = ["LinkedIn", "Facebook", "Twitter", "Instagram", "YouTube"];
  const priorities = ["High", "Medium", "Low"];

  return platforms.flatMap((platform) =>
    Array.from({ length: 6 }, (_, index) => ({
      name: `User ${index + 1} on ${platform}`,
      email: `user${index + 1}@${platform.toLowerCase()}.com`,
      phone: `123-456-78${index}`,
      location: `City ${index + 1}`,
      platform,
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      image: `https://i.pravatar.cc/150?img=${Math.floor(
        Math.random() * 70
      ) + 1}`,
    }))
  );
};

const SocialMediaCards = ({ priorityFilter }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const getUsersData = async () => {
      const data = await fetchUsers();
      if (data.length === 0) {
        const randomUsers = generateRandomUsers();
        setUsers(randomUsers);
      } else {
        const usersWithImages = data.map((user) => ({
          ...user,
          image: `https://i.pravatar.cc/150?img=${Math.floor(
            Math.random() * 70
          ) + 1}`,
        }));
        setUsers(usersWithImages);
      }
    };

    getUsersData();
  }, []);

  // Filter users based on priority
  const filteredUsers = priorityFilter
    ? users.filter((user) => user.priority === priorityFilter)
    : users;

  const groupedUsers = filteredUsers.reduce((acc, user) => {
    if (!acc[user.platform]) {
      acc[user.platform] = [];
    }
    acc[user.platform].push(user);
    return acc;
  }, {});

  const platformIcons = {
    LinkedIn: FaLinkedin,
    Facebook: FaFacebook,
    Twitter: FaTwitter,
    Instagram: FaInstagram,
    YouTube: FaYoutube,
  };

  const platformColors = {
    LinkedIn: "#0077B5",
    Facebook: "#1877F2",
    Twitter: "#1DA1F2",
    Instagram: "#C13584",
    YouTube: "#FF0000",
  };

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  const closePopup = () => {
    setSelectedUser(null);
  };

  const handleAddUser = (platform) => {
    alert(`Add user for ${platform}`);
  };

  return (
    <div className={styles["social-media-cards"]}>
      <div className={styles["card-header"]}>
        <HiOutlineFilter className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700" />
        <span className="text-blue-600">Customization Lead Management</span>
      </div>

      <div className={styles["platforms-grid"]}>
        {Object.keys(groupedUsers).map((platform) => {
          const Icon = platformIcons[platform] || FaLinkedin;
          const color = platformColors[platform] || "#0077B5";

          return (
            <div
              key={platform}
              className={styles["individual-platform"]}
              style={{ borderColor: color, backgroundColor: color }}
            >
              <div className={styles["platform-header"]}>
                <div className="flex items-center gap-2">
                  <Icon style={{ color: "white", fontSize: "1.5rem" }} />
                  <span style={{ color: "white" }} className="font-semibold">
                    {platform}
                  </span>
                </div>
                <button
                  onClick={() => handleAddUser(platform)}
                  className={styles["add-button"]}
                  style={{ backgroundColor: "white", color: color }}
                >
                  <FaPlus className="h-5 w-5" />
                </button>
              </div>

              <div className={styles["platform-users"]}>
                {groupedUsers[platform].map((user) => (
                  <div
                    key={user.email}
                    className={styles["user-card"]}
                    onClick={() => handleSelectUser(user)}
                  >
                    <div className={styles["user-info"]}>
                      <img
                        src={user.image}
                        alt={user.name}
                        className="h-8 w-8 rounded-full"
                      />
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-600">{user.phone}</p>
                        <p className="text-sm text-gray-600">{user.location}</p>
                        <span
                          className={`${styles["priority-badge"]} ${styles[user.priority.toLowerCase()]}`}
                        >
                          {user.priority}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selectedUser && (
        <div className={styles["popup-overlay"]}>
          <div className={styles["popup-content"]}>
            <button className={styles["close-btn"]} onClick={closePopup}>
              <FaTimes />
            </button>
            <div className={styles["popup-header"]}>
              <h2>User Details</h2>
            </div>
            <div className={styles["popup-body"]}>
              <div className={styles["user-details-container"]}>
                <div className={styles["user-info"]}>
                  <h3>{selectedUser.name}</h3>
                  <p>{selectedUser.email}</p>
                  <p>{selectedUser.platform}</p>
                  <p>{selectedUser.phone}</p>
                  <p>{selectedUser.location}</p>
                </div>
                <img
                  src={selectedUser.image}
                  alt={selectedUser.name}
                  className={styles["user-profile-img"]}
                />
              </div>
            </div>
            <div className={styles["popup-footer"]}>
              <button className={styles["delete-btn"]}>Delete User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialMediaCards;
