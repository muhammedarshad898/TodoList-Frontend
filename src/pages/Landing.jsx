import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/pages/Landing.module.css';
import buttonStyles from '../styles/components/Button.module.css';

const Landing = () => {
  return (
    <div className={styles.landingContainer}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Organize Your Life with Ease</h1>
          <p className={styles.heroSubtitle}>
            The simplest and most efficient way to manage your tasks and boost your productivity
          </p>
          <Link to="/dash" className={`${buttonStyles.button} ${buttonStyles.primary}`}>
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <h2 className={styles.featuresTitle}>Why Choose Our Todo App?</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>📝</div>
            <h3 className={styles.featureTitle}>Simple & Intuitive</h3>
            <p className={styles.featureDescription}>Clean interface that makes task management a breeze</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>⚡</div>
            <h3 className={styles.featureTitle}>Lightning Fast</h3>
            <p className={styles.featureDescription}>Quick and responsive - no waiting around</p>
          </div>
          <div className={styles.featureCard}>
            <div className={styles.featureIcon}>🎯</div>
            <h3 className={styles.featureTitle}>Stay Focused</h3>
            <p className={styles.featureDescription}>Prioritize tasks and track your progress</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Ready to Get Organized?</h2>
        <p className={styles.ctaDescription}>Join thousands of users who have transformed their productivity</p>
        <Link to="/dash" className={`${buttonStyles.button} ${buttonStyles.secondary}`}>
          Start Managing Tasks
        </Link>
      </section>
    </div>
  );
};

export default Landing;