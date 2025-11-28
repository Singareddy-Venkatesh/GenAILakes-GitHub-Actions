// NavigationBar.tsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPalette,
  faUser,
  faSignOutAlt,
  faBell,
  faSearch,
  faShoppingCart,
  faUserPlus,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import styles from '../../styles/Navbar/Navbar.module.css';
import Profile from './Profile';
import Sidebar from './Sidebar'; // Import Sidebar

// UserMenuItem Component
function UserMenuItem({ icon, text }) {
  return (
    <div className={styles.menuItem} role="button" tabIndex={0}>
      <FontAwesomeIcon icon={icon} className={styles.menuIcon} />
      <div className={styles.menuText}>{text}</div>
    </div>
  );
}

// ThemeSelector Component
function ThemeSelector({ onChangeTheme }) {
  return (
    <div className={styles.themeContainer}>
      <div className={styles.themeOptions}>
        <div
          className={styles.themeCircle}
          role="button"
          tabIndex={0}
          aria-label="Theme option 1"
          onClick={() => onChangeTheme('light')}
        />
        <div
          className={styles.themeCircleWhite}
          role="button"
          tabIndex={0}
          aria-label="Theme option 2"
          onClick={() => onChangeTheme('dark')}
        />
        <div
          className={styles.themeCirclePlain}
          role="button"
          tabIndex={0}
          aria-label="Theme option 3"
          onClick={() => onChangeTheme('blue')}
        />
      </div>
    </div>
  );
}

const menuItems = [
  { icon: faPalette, text: 'Themes' },
  { icon: faUser, text: 'Profile' },
  { icon: faSignOutAlt, text: 'Logout' },
];

// UserProfile Component
const UserProfile = ({ name, role, onClick }) => {
  return (
    <div className={styles.profileSection} onClick={onClick}>
      <div className={styles.profileInfo}>
        <Profile />
      </div>
    </div>
  );
};

// NavigationBar Component
const NavigationBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState('light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar

  const toggleDropdown = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    document.body.className = `theme-${newTheme}`;
    localStorage.setItem('fastleads-theme', newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('fastleads-theme') || 'light';
    setTheme(savedTheme);
    document.body.className = `theme-${savedTheme}`;
  }, []);

  return (
    <nav className={`${styles.container} ${styles[theme]}`}>
      <div className={styles.wrapper}>
        <div className={styles.header}>
          <div className={styles.logoSection}>
            <div className={styles.brandName}>
              <span>FastLeads</span>99
            </div>
            <SearchBar />
          </div>

          <div className={styles.mainContent}>
            <div className={styles.actionButtons}>
              <div className={styles.buttonWrapper}>
                <ActionButton
                  icon={faShoppingCart}
                  label="Buy now"
                  variant="buy"
                />
                <ActionButton
                  icon={faUserPlus}
                  label="Invite"
                  variant="invite"
                />
              </div>
              <FontAwesomeIcon
                icon={faBell}
                className={styles.notificationIcon}
                alt="Notifications"
              />
            </div>

            <UserProfile
              name="Jane Cooper"
              role="Manager"
              onClick={toggleDropdown}
            />
          </div>
        </div>
      </div>

      {/* Sidebar (conditionally rendered based on isSidebarOpen state) */}
      {isSidebarOpen && <Sidebar />} {/* Show the Sidebar */}

    </nav>
  );
};

// ActionButton Component
const ActionButton = ({ icon, label, variant }) => {
  const buttonClass = variant === 'buy' ? styles.buyButton : styles.inviteButton;

  return (
    <button className={buttonClass}>
      <div className={styles.buttonWrapper}>
        <FontAwesomeIcon icon={icon} className={styles.buttonIcon} />
        <span>{label}</span>
      </div>
    </button>
  );
};

// SearchBar Component
const SearchBar = () => {
  return (
    <form className={styles.searchBar} role="search">
      <label htmlFor="searchInput" className={styles.visuallyHidden}>
        Search
      </label>
      <FontAwesomeIcon icon={faSearch} className={styles.buttonIcon} />
      <input
        type="search"
        id="searchInput"
        className={styles.searchInput}
        placeholder="Search"
      />
    </form>
  );
};

export default NavigationBar;
