// Import the functions you need from the SDKs you need
// const firebase = require('firebase');
// const firebase=require('firebase')
// const {initializeApp} = require('firebase/app')
// const {getFirestore} = require('firebase/firestore')
import {initializeApp} from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const {getAuth, GoogleAuthProvider} =require('firebase/auth')
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
 const firebaseConfig = {
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
 let auth = getAuth(app);
  // const database = getDatabase(app);
 const provider=new GoogleAuthProvider();
const db=getFirestore(app)

export default db