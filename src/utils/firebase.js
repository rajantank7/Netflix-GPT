// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2lCaUGRY2nI5jNtvk7ThbFUXuIfHgYc4",
  authDomain: "netflix-gpt-51a50.firebaseapp.com",
  projectId: "netflix-gpt-51a50",
  storageBucket: "netflix-gpt-51a50.firebasestorage.app",
  messagingSenderId: "377558955577",
  appId: "1:377558955577:web:bf428b6eba100b2a76ffe8",
  measurementId: "G-NGSVY2DF8R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
