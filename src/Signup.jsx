import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase-config';
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import Spline from '@splinetool/react-spline';
import './styles.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      setLoading(true);
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = () => {
    alert('Facebook login is not implemented yet.');
  };

  const handleGoogleLogin = async () => {
    setError('');
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      setLoading(true);
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-background">
      <div className="login-container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Create Account</h2>

          <div className="social-buttons">
            <button type="button" className="facebook-button" onClick={handleFacebookLogin}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_(2019).png"
                alt="Facebook"
                width="20"
              />
              Connect with Facebook
            </button>
            <button type="button" className="google-button" onClick={handleGoogleLogin}>
              <img
                src="https://tse3.mm.bing.net/th/id/OIP.-bin7Uwm8Qnb3PVkjcT43wHaHa?pid=Api&P=0&h=180"
                alt="Google"
                width="20"
              />
              Connect with Google
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
              placeholder="Enter password"
            />
          </div>

          <div className="input-group">
            <label className="input-group__label">Re-enter Password</label>
            <input
              className="input-group__input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Re-enter password"
            />
          </div>

          <button className="button" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>

          <p style={{ marginTop: '10px' }}>
            Already have an account?
            <a href="/login" style={{ color: '#1d3fd6', fontWeight: 'bold' }}> Login</a>
          </p>
        </form>

        <div className="spline-container">
          <Spline scene="https://prod.spline.design/B5PVG1sWmFE5L3Zf/scene.splinecode" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
