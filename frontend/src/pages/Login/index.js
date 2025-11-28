import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "./Login.module.css";

const Login = () => {
  const [formData, setFormData] = useState({
    emailid: "",
    password: "",
    showPassword: false,
    rememberMe: false,
  });
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchRegisteredUsers();
  }, []);

  const fetchRegisteredUsers = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/profile");
      const data = await response.json();
      if (data.status === "success") {
        setRegisteredUsers(data.data);
      }
    } catch (error) {
      console.error("Error fetching registered users:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // Get registered users data
      const profileResponse = await fetch("http://127.0.0.1:8000/profile");
      const profileData = await profileResponse.json();
      console.log("Profile data:", profileData);

      // Find matching user
      const user = profileData.data.find(u => 
        u.emailid === formData.emailid && 
        u.password === formData.password
      );

      if (user) {
        // Store user data and redirect
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isLoggedIn", "true");
        router.push("/");
      } else {
        alert("Invalid email or password");
      }

    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your connection and try again.");
    }
  };

  const toggleButtonStyle = {
    position: "absolute",
    right: "25px",
    top: "35%",
    transform: "translateY(-50%)",
    cursor: "pointer",
    fontSize: "24px",
    display: "flex",
    alignItems: "center",
    height: "calc(100% - 3px)",
    padding: "10px 1px",
    background: "transparent",
    border: "none",
    outline: "none",
    margin: '5px 0'
  };

  return (
    <div className={styles.body}>
      <div className={styles.loginContainer}>
        <div className={styles.leftPane}>
          <h1 className={styles.title}>FASTLEADS99</h1>
          <div className={styles.imageContainer}>
            <img
              src="/icons/login.ico"
              alt="Funnel Illustration"
              className={styles.image}
            />
          </div>
        </div>

        <div className={styles.rightPane}>
          <div className={styles.loginForm}>
            <h2 className={styles.loginTitle}>Login</h2>

            <form onSubmit={handleLogin} className={styles.form}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Email ID
                  <input
                    type="email"
                    name="emailid"
                    value={formData.emailid}
                    onChange={handleInputChange}
                    className={styles.input}
                    placeholder="Enter your email address"
                    required
                  />
                </label>
              </div>

              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Password
                  <div style={{ position: "relative" }}>
                    <input
                      type={formData.showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={styles.input}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          showPassword: !prev.showPassword,
                        }))
                      }
                      style={toggleButtonStyle}
                    >
                      {formData.showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                </label>
              </div>

              <div className={styles.options}>
                <label>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                  />
                  Remember me
                </label>
                <a href="/forgotpassword" className={styles.link}>
                  Forgot Password?
                </a>
              </div>

              <button type="submit" className={styles.loginButton}>
                Login
              </button>
            </form>

            <p className={styles.registerLink}>
              Don't have an account?{" "}
              <span
                onClick={() => router.push("/Register")}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;