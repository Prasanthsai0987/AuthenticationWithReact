import React, { useState, useRef } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebase-config';
import Spline from '@splinetool/react-spline';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const emailRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setMessage('');

    const actionCodeSettings = {
      url: 'https://login-c3f6f.firebaseapp.com', // default Firebase redirect URL
      handleCodeInApp: false
    };

    try {
      console.log("Attempting to send reset to:", email);
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      console.log("Email sent");
      setIsSent(true);
    } catch (error) {
      console.error("Reset Error:", error.code, error.message);
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setEmail('');
    setMessage('');
    setIsSent(false);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'rgb(1, 16, 29) 50%', color: '#00ffea' }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <div style={styles.card}>
          <div style={styles.header}>
            <div style={styles.icon}>
              <svg viewBox="0 0 24 24" style={styles.iconSvg}>
                <path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z" />
              </svg>
            </div>
            <h1 style={styles.title}>Password Recovery</h1>
            <p style={styles.subtitle}>Enter your email to reset your password</p>
          </div>

          {!isSent ? (
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label htmlFor="email" style={styles.label}>Email Address</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  ref={emailRef}
                  style={styles.input}
                  disabled={isLoading}
                />
              </div>

              {message && <p style={styles.error}>{message}</p>}

              <button
                type="submit"
                style={isLoading ? { ...styles.button, ...styles.loadingButton } : styles.button}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          ) : (
            <div style={styles.successContainer}>
              <div style={styles.successIcon}>
                <svg viewBox="0 0 24 24" style={styles.iconSvg}>
                  <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
                </svg>
              </div>
              <h2 style={styles.successTitle}>Reset Link Sent!</h2>
              <p style={styles.successText}>
                We've sent a password reset link to <strong>{email}</strong>.
                Please check your inbox and follow the instructions.
              </p>
              <button onClick={handleReset} style={styles.resetButton}>
                Reset Another Email
              </button>
            </div>
          )}

          <div style={styles.footer}>
            <p style={styles.footerText}>Remember your password? <a href="#" style={styles.link}>Sign In</a></p>
          </div>
        </div>
      </div>
      <div style={{ flex: 1, height: '100vh' }}>
        <Spline scene="https://prod.spline.design/xDf3YYRv1DtlVwWJ/scene.splinecode" />
      </div>
    </div>
  );
};

// Reuse your styles from previous code
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a1929 0%, #0a0f1a 100%)',
    color: '#00ffea',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  gridLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: `
      linear-gradient(rgba(0, 100, 255, 0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 100, 255, 0.1) 1px, transparent 1px)
    `,
    backgroundSize: '40px 40px',
    zIndex: 2,
  },
  particles: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(0, 255, 234, 0.1) 0%, transparent 20%), radial-gradient(circle at 80% 70%, rgba(0, 100, 255, 0.1) 0%, transparent 30%)',
    zIndex: 1,
  },
  card: {
    width: '100%',
    maxWidth: '500px',
    background: 'linear-gradient(135deg, rgba(10, 25, 41, 0.95) 0%, rgba(5, 15, 25, 0.95) 100%)',
    borderRadius: '15px',
    padding: '40px',
    boxShadow: `
      0 0 20px rgba(0, 255, 234, 0.2),
      0 0 40px rgba(0, 100, 255, 0.1)
    `,
    border: '1px solid rgba(0, 200, 255, 0.3)',
    position: 'relative',
    overflow: 'hidden',
    zIndex: 10,
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  icon: {
    width: '80px',
    height: '80px',
    margin: '0 auto 20px',
    background: 'rgba(0, 255, 234, 0.1)',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid rgba(0, 200, 255, 0.4)',
    boxShadow: '0 0 15px rgba(0, 200, 255, 0.3)',
  },
  iconSvg: {
    fill: '#00ffea',
    width: '40px',
    height: '40px',
  },
  title: {
    fontSize: '32px',
    color: '#00ffea',
    textShadow: '0 0 10px rgba(0, 255, 234, 0.7)',
    letterSpacing: '1px',
    marginBottom: '10px',
  },
  subtitle: {
    color: '#a0f0ff',
    fontSize: '16px',
    lineHeight: '1.5',
  },
  form: {
    marginTop: '20px',
  },
  inputGroup: {
    marginBottom: '25px',
  },
  label: {
    display: 'block',
    fontSize: '16px',
    color: '#00ffea',
    marginBottom: '10px',
    paddingLeft: '5px',
    textShadow: '0 0 5px rgba(0, 255, 234, 0.5)',
  },
  input: {
    width: '100%',
    padding: '14px 20px',
    border: '1px solid rgba(0, 200, 255, 0.4)',
    borderRadius: '30px',
    background: 'rgba(0, 20, 40, 0.5)',
    color: '#00ffea',
    fontSize: '16px',
    outline: 'none',
    transition: 'all 0.3s ease',
    boxShadow: `
      inset 0 0 5px rgba(0, 200, 255, 0.3),
      0 0 10px rgba(0, 200, 255, 0.1)
    `,
  },
  error: {
    color: '#ff3860',
    fontSize: '14px',
    margin: '-15px 0 20px 10px',
    textShadow: '0 0 5px rgba(255, 56, 96, 0.5)',
  },
  button: {
    width: '100%',
    padding: '14px',
    border: 'none',
    borderRadius: '30px',
    background: 'linear-gradient(90deg, #0080ff, #00ffea)',
    color: '#0a1929',
    fontWeight: 'bold',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '10px',
    boxShadow: '0 0 15px rgba(0, 200, 255, 0.5)',
    position: 'relative',
    overflow: 'hidden',
  },
  loadingButton: {
    background: 'rgba(0, 20, 40, 0.7)',
    color: '#00ffea',
    cursor: 'not-allowed',
  },
  successContainer: {
    textAlign: 'center',
    padding: '20px 0',
  },
  successIcon: {
    width: '80px',
    height: '80px',
    margin: '0 auto 20px',
    background: 'rgba(0, 255, 150, 0.1)',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid rgba(0, 255, 150, 0.4)',
    boxShadow: '0 0 15px rgba(0, 255, 150, 0.3)',
  },
  successTitle: {
    fontSize: '28px',
    color: '#00ff9a',
    textShadow: '0 0 10px rgba(0, 255, 150, 0.7)',
    marginBottom: '15px',
  },
  successText: {
    color: '#a0f0ff',
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '25px',
  },
  resetButton: {
    padding: '12px 30px',
    border: 'none',
    borderRadius: '30px',
    background: 'rgba(0, 20, 40, 0.7)',
    color: '#00ffea',
    fontWeight: 'bold',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 0 10px rgba(0, 200, 255, 0.3)',
    border: '1px solid rgba(0, 200, 255, 0.4)',
  },
  footer: {
    marginTop: '30px',
    textAlign: 'center',
    borderTop: '1px solid rgba(0, 200, 255, 0.2)',
    paddingTop: '20px',
  },
  footerText: {
    color: '#a0f0ff',
    fontSize: '14px',
  },
  link: {
    color: '#00ffea',
    textDecoration: 'none',
    fontWeight: 'bold',
    textShadow: '0 0 5px rgba(0, 255, 234, 0.5)',
  },
};

export default ForgotPassword;

