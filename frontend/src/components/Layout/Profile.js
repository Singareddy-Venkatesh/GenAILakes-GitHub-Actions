import React, { useState, useEffect } from 'react';
import styles from "../../styles/Userprofile/UserProfile.module.css";
import { FaUser, FaSignOutAlt, FaPalette } from 'react-icons/fa';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function UserProfile() {
    const [isOpen, setIsOpen] = useState(false);
    const [username, setUsername] = useState('');
    const [theme, setTheme] = useState('light');
    const [activeTheme, setActiveTheme] = useState('light');
    const router = useRouter();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const changeTheme = (selectedTheme) => {
        setTheme(selectedTheme);
        setActiveTheme(selectedTheme);
    };

    const handleProfileClick = () => {
        setIsOpen(false);
        router.push('/Profile-details');
    };

    const handleLogout = () => {
        router.push('/Login');
    };

    useEffect(() => {
        document.body.classList.add(styles[theme]);
        return () => {
            document.body.classList.remove(styles[theme]);
        };
    }, [theme]);

    useEffect(() => {
        // Add this effect to handle user data
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData && userData.username) {
            setUsername(userData.username);
        }
    }, []);

    return (
        <div className={styles.userProfile}>
            <button onClick={toggleDropdown} className={styles.profileButton}>
                <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/55938268bcdac80412255a2b5434dc6647804e83bbb10abdc70c9818c04ed309"
                    alt="User Avatar"
                    className={styles.avatar}
                />
                <span className={styles.username}>{username || 'Guest'}</span>
            </button>
            {isOpen && (
                <div className={styles.dropdown}>
                    <ul>
                        <li className={styles.themesListItem}>
                            <a className={styles.themesLink}>
                                <FaPalette className={styles.icon} /> Themes
                            </a>
                            <div className={styles.themeSelector}>
                                <button
                                    onClick={() => changeTheme('light')}
                                    className={`${styles.themeButton} ${styles.lightButton} ${activeTheme === 'light' ? styles.activeTheme : ''}`}
                                ></button>
                                <button
                                    onClick={() => changeTheme('dark')}
                                    className={`${styles.themeButton} ${styles.darkButton} ${activeTheme === 'dark' ? styles.activeTheme : ''}`}
                                ></button>
                                <button
                                    onClick={() => changeTheme('gradient')}
                                    className={`${styles.themeButton} ${styles.gradientButton} ${activeTheme === 'gradient' ? styles.activeTheme : ''}`}
                                ></button>
                            </div>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <button onClick={handleProfileClick} className={styles.dropdownLink}>
                                <FaUser className={styles.icon} /> Profile
                            </button>
                        </li>
                        <li>
                            <button onClick={handleLogout} className={styles.dropdownLink}>
                                <FaSignOutAlt className={styles.icon} /> Logout
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
}
