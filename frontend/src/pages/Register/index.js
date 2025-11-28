import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./Register.module.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    const userData = {
      username: username,
      emailid: email,
      pn_number: phoneNumber,
      password: password,
      role: 'Manager',
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        router.push("/Login");
      } else {
        // Enhanced error handling for existing credentials
        if (data.detail.includes("username")) {
          alert("Username already exists. Please try a different username.");
        } else if (data.detail.includes("email")) {
          alert("Email address already registered. Please use a different email.");
        } else if (data.detail.includes("phone")) {
          alert("Phone number already registered. Please use a different number.");
        } else {
          alert(data.detail || "Registration failed. Please try different credentials.");
        }
      }
    } catch (error) {
      alert("Error registering user");
      console.error("Fetch error:", error);
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
      <div className={styles.registerContainer}>
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
          <div className={styles.registerForm}>
            <h2 className={styles.loginTitle}>New Registration</h2>
            <form onSubmit={handleRegister} className={styles.form}>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Username
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.trim())}
                    className={styles.input}
                    placeholder="Enter your username"
                    required
                  />
                </label>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Email ID
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.trim())}
                    className={styles.input}
                    placeholder="Enter your email address"
                    required
                  />
                </label>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Phone Number
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.trim())}
                    className={styles.input}
                    placeholder="Enter your phone number"
                    required
                  />
                </label>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Password
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={styles.input}
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={toggleButtonStyle}
                    >
                      {showPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                </label>
              </div>
              <div className={styles.inputGroup}>
                <label className={styles.label}>
                  Confirm Password
                  <div style={{ position: "relative" }}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={styles.input}
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      style={toggleButtonStyle}
                    >
                      {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                    </button>
                  </div>
                </label>
              </div>
              <button type="submit" className={styles.registerButton}>
                Register
              </button>
            </form>
            <p className={styles.loginLink}>
              Already have an account?{" "}
              <span
                onClick={() => router.push("/Login")}
                style={{ cursor: "pointer", color: "blue" }}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;