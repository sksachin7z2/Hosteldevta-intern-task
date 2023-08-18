// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
export const firebaseConfig = {
  apiKey: "AIzaSyC74PSa8wJASjaAo9w1_z0bzTiWqsafJc4",
  authDomain: "dorminn-6ba10.firebaseapp.com",
  projectId: "dorminn-6ba10",
  storageBucket: "dorminn-6ba10.appspot.com",
  messagingSenderId: "1076140210981",
  appId: "1:1076140210981:web:f4252b0b986dc4c58d78cc",
  
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export let auth = getAuth(app);
 export const database = getDatabase(app);
export const provider=new GoogleAuthProvider();