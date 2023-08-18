// Import the functions you need from the SDKs you need
// const firebase = require('firebase');
// const firebase=require('firebase')
// const {initializeApp} = require('firebase/app')
// const {getFirestore} = require('firebase/firestore')
import {initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import 'dotenv/config'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const {getAuth, GoogleAuthProvider} =require('firebase/auth')
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
 const firebaseConfig = {
  apiKey: "AIzaSyC74PSa8wJASjaAo9w1_z0bzTiWqsafJc4",
  authDomain: "dorminn-6ba10.firebaseapp.com",
  projectId: "dorminn-6ba10",
  storageBucket: "dorminn-6ba10.appspot.com",
  messagingSenderId: "1076140210981",
  appId: "1:1076140210981:web:f4252b0b986dc4c58d78cc"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 let auth = getAuth(app);
  // const database = getDatabase(app);
 const provider=new GoogleAuthProvider();
const db=getFirestore(app)

export default db