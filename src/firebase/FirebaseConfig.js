// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmncFQElAGyVAr59igPPmEcrPARx0OqOI",
  authDomain: "kids-toy-store-platform.firebaseapp.com",
  projectId: "kids-toy-store-platform",
  storageBucket: "kids-toy-store-platform.firebasestorage.app",
  messagingSenderId: "968965561015",
  appId: "1:968965561015:web:5c841c0b19f43e083a8b32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);