import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from './firebase-config';
import Spline from '@splinetool/react-spline';
import './styles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Login failed: ' + err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: 'select_account',
    });

    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (err) {
      setError('Google login failed: ' + err.message);
    }
  };

  const handleFacebookLogin = () => {
    alert('Facebook login is not implemented yet.');
  };

  return (
    <div className="background">
      <div className="login-container">
        <form className="form" onSubmit={handleEmailLogin}>
          <h2>Member Login</h2>

          <div className="social-buttons">
            <button type="button" className="facebook-button" onClick={handleFacebookLogin}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_(2019).png"
                alt="Facebook"
                width="20"
              />
              Facebook
            </button>
            <button type="button" className="google-button" onClick={handleGoogleLogin}>
              <img
                src="https://tse3.mm.bing.net/th/id/OIP.-bin7Uwm8Qnb3PVkjcT43wHaHa?pid=Api&P=0&h=180"
                alt="Google"
                width="20"
              />
              Google
            </button>
          </div>

          <div className="divider">
            <span className="divider-text">or</span>
          </div>

          {error && <div className="error">{error}</div>}

          <div className="input-group">
            <label className="input-group__label">Email</label>
            <input
              className="input-group__input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="input-group">
            <label className="input-group__label">Password</label>
            <input
              className="input-group__input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="links">
            <a href="/forgot-password">Forgot Password?</a> · <a href="/help">Need help?</a>
          </div>

          <div className="checkbox-group">
            <input type="checkbox" id="rememberMe" />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>

          <button className="button" type="submit">
            Login
          </button>

          <p className="signup-link">
            Don’t have an account? <a href="/signup">Create one</a>
          </p>
        </form>

        <div className="spline-container">
          <Spline scene="https://prod.spline.design/KFSUA6RgQmsaUGck/scene.splinecode" />
        </div>
      </div>
    </div>
  );
};

export default Login;
