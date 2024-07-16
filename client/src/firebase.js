// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-9f26a.firebaseapp.com",
  projectId: "mern-estate-9f26a",
  storageBucket: "mern-estate-9f26a.appspot.com",
  messagingSenderId: "233823900724",
  appId: "1:233823900724:web:0aca93afa1c6c6a53fe661"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);