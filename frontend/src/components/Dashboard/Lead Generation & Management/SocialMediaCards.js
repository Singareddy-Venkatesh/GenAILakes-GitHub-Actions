"use client";
import React, { useEffect, useState } from "react";
import { FaLinkedin, FaFacebook, FaInstagram, FaYoutube, FaTwitter, FaPlus, FaTimes } from "react-icons/fa";
import { HiOutlineFilter } from "react-icons/hi";
import styles from "/src/styles/LeadGeneration/Socialmediacard.module.css";

const API_URL = "http://localhost:8000/users";

// Fallback user data
const fallbackUsers = [
    { name: "Alice Johnson", email: "alice@example.com", phone: "123-456-7890", location: "New York", platform: "LinkedIn", priority: "High" },
    { name: "Bob Smith", email: "bob@example.com", phone: "234-567-8901", location: "Los Angeles", platform: "Facebook", priority: "Medium" },
    { name: "Charlie Brown", email: "charlie@example.com", phone: "345-678-9012", location: "Chicago", platform: "Twitter", priority: "Low" },
    { name: "Diana Prince", email: "diana@example.com", phone: "456-789-0123", location: "Houston", platform: "Instagram", priority: "High" },
    { name: "Ethan Hunt", email: "ethan@example.com", phone: "567-890-1234", location: "Phoenix", platform: "YouTube", priority: "Medium" },
    { name: "Fiona Apple", email: "fiona@example.com", phone: "678-901-2345", location: "Philadelphia", platform: "LinkedIn", priority: "Low" },
    { name: "George Washington", email: "george@example.com", phone: "789-012-3456", location: "San Antonio", platform: "Facebook", priority: "High" },
    { name: "Hannah Montana", email: "hannah@example.com", phone: "890-123-4567", location: "San Diego", platform: "Twitter", priority: "Medium" },
    { name: "Ian Somerhalder", email: "ian@example.com", phone: "901-234-5678", location: "Dallas", platform: "Instagram", priority: "Low" },
    { name: "Ethan Hunt", email: "ethan@example.com", phone: "567-890-1234", location: "Phoenix", platform: "YouTube", priority: "Medium" },
    { name: "Alice Johnson", email: "alice@example.com", phone: "123-456-7890", location: "New York", platform: "LinkedIn", priority: "High" },
    { name: "Bob Smith", email: "bob@example.com", phone: "234-567-8901", location: "Los Angeles", platform: "Facebook", priority: "Medium" },
    { name: "Charlie Brown", email: "charlie@example.com", phone: "345-678-9012", location: "Chicago", platform: "Twitter", priority: "Low" },
    { name: "Diana Prince", email: "diana@example.com", phone: "456-789-0123", location: "Houston", platform: "Instagram", priority: "High" },
    { name: "Ethan Hunt", email: "ethan@example.com", phone: "567-890-1234", location: "Phoenix", platform: "YouTube", priority: "Medium" },
    { name: "Fiona Apple", email: "fiona@example.com", phone: "678-901-2345", location: "Philadelphia", platform: "LinkedIn", priority: "Low" },
    { name: "George Washington", email: "george@example.com", phone: "789-012-3456", location: "San Antonio", platform: "Facebook", priority: "High" },
    { name: "Hannah Montana", email: "hannah@example.com", phone: "890-123-4567", location: "San Diego", platform: "Twitter", priority: "Medium" },
    { name: "Ian Somerhalder", email: "ian@example.com", phone: "901-234-5678", location: "Dallas", platform: "Instagram", priority: "Low" },
    { name: "Ethan Hunt", email: "ethan@example.com", phone: "567-890-1234", location: "Phoenix", platform: "YouTube", priority: "Medium" },
];

const SocialMediaCards = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [priorityOptions] = useState(["High", "Medium", "Low"]);

    useEffect(() => {
        const fetchUsersData = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error.message);
                // Use fallback users if the backend is unavailable
                setUsers(fallbackUsers);
            }
        };

        fetchUsersData();
    }, []);

    const groupedUsers = users.reduce((acc, user) => {
        (acc[user.platform] = acc[user.platform] || []).push(user);
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
        Facebook: "#1877F2",
        Twitter: "#1DA1F2",
        LinkedIn: "#0A66C2",
        Instagram: "#C32AA3",
        YouTube:"#FF0000"
    };

    const handleSelectUser = (user) => {
        setSelectedUser(user);
    };

    const closePopup = () => {
        setSelectedUser(null);
    };

    const handlePriorityChange = async (newPriority) => {
        if (selectedUser) {
            try {
                const response = await fetch(`${API_URL}/${selectedUser.email}`, {
                    method:'PUT',
                    headers:{
                        'Content-Type':'application/json',
                    },
                    body : JSON.stringify({...selectedUser,priority:newPriority}),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status:${response.status}`);
                }
                // Update local state with new priority
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.email === selectedUser.email ? {...user, priority:newPriority} : user
                    )
                );
                // Update selected user state
                setSelectedUser((prev) => ({...prev, priority:newPriority}));
            } catch (error) {
                console.error("Error updating user priority:", error.message);
            }
        }
    };

    return (
        <div className={styles["social-media-cards"]}>
            <div className={styles["card-header"]}>
                <HiOutlineFilter className="h-6 w-6 text-gray-500 cursor-pointer hover:text-gray-700" />
                <span className="text-blue-600">Customization Lead Management</span>
            </div>

            <div className={styles["platforms-grid"]}>
                {Object.entries(groupedUsers).map(([platform, platformUsers]) => {
                    const Icon = platformIcons[platform] || FaLinkedin;
                    const color = platformColors[platform] || "#0077B5"; // Default fallback color

                    return (
                        <div key={platform} className={styles["individual-platform"]} style={{ borderColor: color, backgroundColor: color }}>
                            <div className={styles["platform-header"]}>
                                <div className="flex items-center gap-2">
                                    <Icon style={{ color : 'white', fontSize : '1.5rem' }} />
                                    <span style={{ color : 'white' }} className="font-semibold">{platform}</span>
                                </div>
                                <button onClick={() => alert(`Add user for ${platform}`)} className={styles["add-button"]} style={{ backgroundColor : 'white', color }}>
                                    <FaPlus className="h-5 w-5" />
                                </button>
                            </div>

                            <div className={styles["platform-users"]}>
                                {platformUsers.map((user) => (
                                    <div key={user.email} className={styles["user-card"]} onClick={() => handleSelectUser(user)}>
                                        <div className={styles["user-info"]}>
                                            <img src={`https://i.pravatar.cc/150?u=${user.email}`} alt={user.name} className="h-8 w-8 rounded-full" />
                                            <div>
                                                <p className="font-medium">{user.name}</p>
                                                <p className="text-sm text-gray-600">{user.email}</p>
                                                <p className="text-sm text-gray-600">{user.phone}</p>
                                                <p className="text-sm text-gray-600">{user.location}</p>
                                                <span className={`${styles["priority-badge"]} ${styles[user.priority.toLowerCase()]}`}>{user.priority}</span>
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
                                <img src={`https://i.pravatar.cc/150?u=${selectedUser.email}`} alt={selectedUser.name} className={styles["user-profile-img"]} />
                                <div className={styles["user-info"]}>
                                    <h3>{selectedUser.name}</h3>
                                    <p>{selectedUser.email}</p>
                                    <p>{selectedUser.platform}</p>
                                    <p>{selectedUser.phone}</p>
                                    <p>{selectedUser.location}</p>

                                    {/* Dropdown for changing priority */}
                                    <label htmlFor="priority">Change Priority:</label>
                                    <select
                                        id="priority"
                                        value={selectedUser.priority}
                                        onChange={(e) => handlePriorityChange(e.target.value)}
                                        className="mt-2"
                                    >
                                        {priorityOptions.map((option) => (
                                            <option key={option} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={styles["popup-footer"]}>
                            {/* Implement delete functionality here */}
                            <button className={styles["delete-btn"]}>Delete User</button> 
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SocialMediaCards;
