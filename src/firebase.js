// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDN4aXIfytGdLj9YAjbckeUVCZaj34b5F0",
  authDomain: "image-quiz-2161f.firebaseapp.com",
  projectId: "image-quiz-2161f",
  storageBucket: "image-quiz-2161f.firebasestorage.app",
  messagingSenderId: "695204418836",
  appId: "1:695204418836:web:caa8e2de1ca300b6361e01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)