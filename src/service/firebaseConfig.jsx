// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "ai-trip-planner-a276c.firebaseapp.com",
  projectId: "ai-trip-planner-a276c",
  storageBucket: "ai-trip-planner-a276c.appspot.com",
  messagingSenderId: "266770318599",
  appId: "1:266770318599:web:563ebde1630382852f71a2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);

