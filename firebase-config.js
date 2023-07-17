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
  apiKey: process.env.APIKEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  databaseURL: process.env.DATABASEURL,
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
 let auth = getAuth(app);
  // const database = getDatabase(app);
 const provider=new GoogleAuthProvider();
const db=getFirestore(app)

export default db