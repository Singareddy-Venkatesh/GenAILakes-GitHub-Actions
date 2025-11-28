import styles from '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.globalReset}>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
