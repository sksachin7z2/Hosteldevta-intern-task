// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
export const firebaseConfig = {
  apiKey: "AIzaSyBEAfjAVysNRmPq6v8toqwxBFa7lyZ3vV0",
  authDomain: "dorminn.firebaseapp.com",
  projectId: "dorminn",
  storageBucket: "dorminn.appspot.com",
  messagingSenderId: "467403049747",
  appId: "1:467403049747:web:4cb3f83e2eabed19cb68e6",
  databaseURL: "https://dorminn-default-rtdb.firebaseio.com",
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 export let auth = getAuth(app);
 export const database = getDatabase(app);
export const provider=new GoogleAuthProvider();