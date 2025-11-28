import React from 'react';
import Link from 'next/link';

export default function Home() {
  return (
    <div style={styles.page}>
      {/* Container */}
      <div style={styles.container}>
        {/* Top Card Section */}
        <div style={styles.card}>
          <h1 style={styles.heading}>Take your website to the next level</h1>
          <button style={styles.button}>Get Started</button>
        </div>

        {/* Bottom Image Section */}
        <div style={styles.imageContainer}>
          <img
            src="https://via.placeholder.com/400x200"
            alt="Futuristic Robot"
            style={styles.image}
          />
        </div>
      </div>

      {/* Footer Buttons at Bottom Right */}
      <div style={styles.footerButtons}>
      <Link href="/upload" passHref>
        <button style={styles.footerButton}>← Preview</button>
        </Link>
        <button style={styles.footerButton}>💾 Save</button>
        <button style={styles.submitButton}>Submit ✅</button>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(to bottom right,rgb(146, 182, 228),rgb(244, 224, 173))',
    margin: 0,
    fontFamily: 'Arial, sans-serif',
    position: 'relative',
  },
  container: {
    width: '400px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  card: {
    background: 'linear-gradient(90deg, #6C00FF, #D700B2)',
    color: 'white',
    padding: '2rem',
    borderRadius: '8px 8px 0 0',
  },
  heading: {
    margin: '0',
    fontSize: '1.8rem',
    fontWeight: 'bold',
    lineHeight: '1.3',
  },
  button: {
    marginTop: '1.5rem',
    backgroundColor: 'white',
    color: '#6C00FF',
    padding: '0.7rem 1.5rem',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  imageContainer: {
    width: '100%',
    height: '200px',
    backgroundColor: '#111827',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '0 0 8px 8px',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
  footerButtons: {
    position: 'absolute',
    bottom: '1.5rem',
    right: '1.5rem',
    display: 'flex',
    gap: '1rem',
  },
  footerButton: {
    padding: '0.5rem 1.2rem',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#F3F4F6',
    color: '#374151',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  submitButton: {
    padding: '0.5rem 1.2rem',
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#6C00FF',
    color: 'white',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};
