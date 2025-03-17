import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBO_nrGw1JF1bRQmct0uVXn1zwEWbmIWp4",
  authDomain: "daily-2fd8d.firebaseapp.com",
  projectId: "daily-2fd8d",
  storageBucket: "daily-2fd8d.firebasestorage.app",
  messagingSenderId: "1088122242196",
  appId: "1:1088122242196:web:e99d61cdfb8f5bdcd5a081",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);
