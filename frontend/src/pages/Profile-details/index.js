import React, { useState, useEffect } from 'react';
import styles from '../../styles/Userprofile/profile.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from '../../components/Layout/Navbar';
import Sidebar from '../../components/Layout/Sidebar';
import { useNavigate } from 'react-router-dom';
export default function Profile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    oldPassword: '',
    newPassword: '',
    reenterPassword: '',
    company: '',
    designation: ''
  });

  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    reenterPassword: false
  });
    useEffect(() => {
      if (typeof window !== 'undefined') {
        const userFromStorage = JSON.parse(localStorage.getItem('user'));
        setCurrentUser(userFromStorage);
        if (userFromStorage) {
          setFormData(prevState => ({
            ...prevState,
            name: userFromStorage.username,
            email: userFromStorage.emailid,
            phone: userFromStorage.pn_number,
            company: userFromStorage.company,
            designation: userFromStorage.designation,
            oldPassword: userFromStorage.password // Add this line
          }));
        }
      }
    }, []);
  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleProfileSave = async () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;
      
      if (!token || !user) return;

      const requestBody = {
        id: user.id,
        username: formData.name,
        emailid: formData.email,
        pn_number: formData.phone,
        password: formData.oldPassword,
        role: user.role || 'Manager'
      };

      const response = await fetch('http://127.0.0.1:8000/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody),
      });

      const responseData = await response.json();
      
      // Direct navigation regardless of response status
      const updatedUser = {
        ...user,
        username: formData.name,
        emailid: formData.email,
        pn_number: formData.phone
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      navigate('/pages/Campaign');
      
    } catch (error) {
      console.error('Profile update error details:', error);
      // Navigate even if there's an error
      navigate('/Campaign');
    }
  };

  const handlePasswordSave = async () => {
    if (formData.newPassword !== formData.reenterPassword) {
      alert('New passwords do not match!');
      return;
    }

    try {
      const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;
      if (!user) return;

      const response = await fetch('http://127.0.0.1:8000/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          emailid: user.emailid,
          old_password: formData.oldPassword,
          new_password: formData.newPassword
        }),
      });

      if (response.status === 200) {
        const result = await response.json();
        alert('Password changed successfully!');
        setFormData(prev => ({
          ...prev,
          oldPassword: '',
          newPassword: '',
          reenterPassword: ''
        }));
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to change password');
      }
    } catch (error) {
      alert(error.message || 'Error changing password. Please try again.');
    }
  };

  return (
    <div className={styles['profile-container']}>
      <div className="navHeader">
        <Navbar toggleSidebar={handleSidebarToggle} />
      </div>

      <div className="main-layout">
        <Sidebar
          className="sidebarele"
          isOpen={isSidebarOpen}
          toggleSidebar={handleSidebarToggle}
        />
    <div className={styles['profile-content']}>

        <div className={styles['profile-card']}>
          <div className={styles['profile-head']}>
            <i className="fas fa-user-circle"></i>
            Profile
          </div>
          
          <div className={styles['profile-subheader']}>
            <div className={styles['profile-info']}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/55938268bcdac80412255a2b5434dc6647804e83bbb10abdc70c9818c04ed309"
                alt="Profile"
                className={styles['profile-picture']}
              />
              <div className={styles['profile-details']}>
              <h2 className={styles['profile-name']}>{formData.name || 'User'}</h2>
              <p className={styles['profile-role']}>Manager</p>
              </div>
            </div>
          </div>

          <div className={styles['profile-body']}>
            <div className={styles['profile-section-left']}>
              <div className={styles['personal-info']}>
                <label className={styles['input-label']}>Username*</label>
                <input 
                  type="text" 
                  name="username"
                  className={styles['input-field']} 
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles['personal-info']}>
                <label className={styles['input-label']}>Email ID*</label>
                <input 
                  type="email" 
                  name="email"
                  className={styles['input-field']} 
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className={styles['personal-info']}>
                <label className={styles['input-label']}>phoneNumber*</label>
                <input 
                  type="tel" 
                  name="phone"
                  className={styles['input-field']} 
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles['button-group']}>
                <button className={styles['cancel-button']}>Cancel</button>
                <button className={styles['save-button']} onClick={handleProfileSave}>Save</button>
                </div>
            </div>

            <div className={styles['profile-section-right']}>
              <h3 className={styles['change-password-title']}>Change Password</h3>
                <div className={styles['password-section']}>
                  <label className={styles['input-label']}>Old Password*</label>
                <div className={styles['password-field-container']}>
                  <input 
                    type={showPasswords.oldPassword ? "text" : "password"}
                    name="oldPassword"
                    className={styles['input-field']} 
                    value={formData.oldPassword}
                    onChange={handleInputChange}
                    placeholder="********"
                    required
                  />
                  <span 
                    className={styles['password-toggle']}
                    onClick={() => togglePasswordVisibility('oldPassword')}
                  >
                    {showPasswords.oldPassword ? '👁️' : '👁️‍🗨️'}
                  </span>
                </div>
              </div>
              <div className={styles['password-section']}>
                <label className={styles['input-label']}>New Password*</label>
                <div className={styles['password-field-container']}>
                  <input 
                    type={showPasswords.newPassword ? "text" : "password"}
                    name="newPassword"
                    className={styles['input-field']} 
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder="********"
                    required
                  />
                  <span 
                    className={styles['password-toggle']}
                    onClick={() => togglePasswordVisibility('newPassword')}
                  >
                    {showPasswords.newPassword ? '👁️' : '👁️‍🗨️'}
                  </span>
                </div>
              </div>

              <div className={styles['password-section']}>
                  <label className={styles['input-label']}>Re-enter Password*</label>
                  <div className={styles['password-field-container']}>
                    <input
                      type={showPasswords.reenterPassword ? "text" : "password"}
                      name="reenterPassword"
                      className={styles['input-field']}
                      value={formData.reenterPassword}
                      onChange={handleInputChange}
                      placeholder="********"
                      required
                    />
                    <span 
                      className={styles['password-toggle']}
                      onClick={() => togglePasswordVisibility('reenterPassword')}
                    >
                      {showPasswords.reenterPassword ? '👁️' : '👁️‍🗨️'}
                    </span>
                    <div className={styles['button-group']}>
                    <button className={styles['cancel-button']}>Cancel</button>
                    <button className={styles['save-button']} onClick={handlePasswordSave}>Save</button>
                  </div>
                  </div>
                </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

