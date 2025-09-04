import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB9WRBXKJPQe8a4q960ExnyvzdNZa9VoXM",
  authDomain: "user-management-system-89d14.firebaseapp.com",
  projectId: "user-management-system-89d14",
  storageBucket: "user-management-system-89d14.firebasestorage.app",
  messagingSenderId: "758162106933",
  appId: "1:758162106933:web:391c19057bdcf18fc2df7c",
  measurementId: "G-47NQP7PZNP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
