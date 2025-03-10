import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC0ydHabGBiZlaa8MtC7OXQUtDCLtRWd6w",
  authDomain: "habits-11936.firebaseapp.com",
  projectId: "habits-11936",
  storageBucket: "habits-11936.firebasestorage.app",
  messagingSenderId: "448362600138",
  appId: "1:448362600138:web:79fd5f444fe6cb2b2c4633",
  measurementId: "G-24MBRGZLBM",
};
// Start Firebase
const app = initializeApp(firebaseConfig);

// Start Auth Service
export const auth = getAuth(app);

// Start Firestore Database
export const db = getFirestore(app);