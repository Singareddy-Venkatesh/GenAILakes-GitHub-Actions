import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../Login/Login.module.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/forgot-password", {
        emailid: email,
      });
      if (response.data) {
        alert("Password reset instructions sent to your email!");
        router.push("/Login");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      alert("Failed to process request. Please try again.");
    }
  };

  return (
    <div className={styles.LoginContainer}>
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
        <h2 className={styles.loginTitle}>Forgot Password</h2>
        <form onSubmit={handleForgotPassword} className={styles.form}>
          <label className={styles.label}>
            Email ID
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              className={styles.input}
              required
            />
          </label>
          <button type="submit" className={styles.button}>
            Reset Password
          </button>
        </form>
        <p className={styles.footerText}>
          Remember your password?{" "}
          <span
            onClick={() => router.push("/Login")}
            style={{ cursor: "pointer", color: "blue" }}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;