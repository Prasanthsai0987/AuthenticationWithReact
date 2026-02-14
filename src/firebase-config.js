// firebase-config.js

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // ✅ Add this

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQc1r4vpaVOX2Io1hsgDh-JGaBQK58ieQ",
  authDomain: "ecommerce-foodordering.firebaseapp.com",
  projectId: "ecommerce-foodordering",
  storageBucket: "ecommerce-foodordering.firebasestorage.app",
  messagingSenderId: "728721912591",
  appId: "1:728721912591:web:63faac49469b2c6946c47a",
  measurementId: "G-DVF2H1JH1C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Initialize Firebase Auth and export it
export const auth = getAuth(app);
