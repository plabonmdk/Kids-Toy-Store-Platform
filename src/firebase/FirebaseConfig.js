
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCmncFQElAGyVAr59igPPmEcrPARx0OqOI",
  authDomain: "kids-toy-store-platform.firebaseapp.com",
  projectId: "kids-toy-store-platform",
  storageBucket: "kids-toy-store-platform.firebasestorage.app",
  messagingSenderId: "968965561015",
  appId: "1:968965561015:web:5c841c0b19f43e083a8b32"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);