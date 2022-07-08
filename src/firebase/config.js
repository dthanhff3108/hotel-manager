// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDH-4fD_f5rccLgJtybHJQ2byXRMz5LofE",
  authDomain: "hotel-manager-c05d9.firebaseapp.com",
  projectId: "hotel-manager-c05d9",
  storageBucket: "hotel-manager-c05d9.appspot.com",
  messagingSenderId: "576057609594",
  appId: "1:576057609594:web:74caa3a1887cea8c6bdac3",
  measurementId: "G-Z0L7GE9MM0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

