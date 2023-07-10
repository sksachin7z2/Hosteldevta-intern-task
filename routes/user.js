
// const express =require('express');
import express from "express";
import db from "../firebase-config.js";
import fillter from "../middleware/fetchuser.js";
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";
const router = express.Router();
import { collection, query, where, getDocs, getDoc, addDoc, doc, onSnapshot, limit, deleteDoc,updateDoc } from "firebase/firestore";

const JWT_SECRET = "Hostel4>v7A"

router.post('/createUser', async (req, res) => {

  try {


    let q = query(collection(db, "users"), where("email", "==", req.body.email), limit(1));
    const user = await getDocs(q);
    if (user.docs.length > 0) {
     
      return res.status(400).json({ status: "user with this email  exist" })
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    let nuser = await addDoc(collection(db, "users"), {
      name: req.body.name,
      contact: req.body.contact?req.body.contact:null,
      password: secPass,
      email: req.body.email
    });
    console.log('ok2')
    const data = {
      id: nuser.id
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    return res.json({ status: "User added to database", authToken: authToken })



  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error")
  }
})
router.post('/createUser1', async (req, res) => {

  try {


    let q = query(collection(db, "users"), where("email", "==", req.body.email), limit(1));
    const user = await getDocs(q);
    if (user.docs.length > 0) {
     
      return res.json({ status: "user with this email  exist" })
    }


    let nuser = await addDoc(collection(db, "users"), {
      name: req.body.name,
      contact: req.body.contact?req.body.contact:null,
      email: req.body.email
    });
    console.log('ok2')
    const data = {
      id: nuser.id
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    return res.json({ status: "User added to database", authToken: authToken })



  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error")
  }
})
router.post('/login', async (req, res) => {

  const { email, password } = req.body;
  try {

    let q = query(collection(db, "users"), where("email", "==", email), limit(1));
    const user = await getDocs(q);
    if (user.docs.length == 0) {
      // console.log(user.docs[0].data(),user.docs.length)
      return res.status(400).json({ status: "user with this email doesnot exist" })
    }
    let userfetch = user.docs[0]
    const passwordCompare = await bcrypt.compare(password, userfetch.data().password);
    if (!passwordCompare) {

      return res.status(400).json({ status: "please try to login with corrrect credentials" });

    }
    const data = {
      id: userfetch.id
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ status: "User loggedin", authToken: authToken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured")

  }

})
router.post('/login1', async (req, res) => {

  const { email} = req.body;
  try {

    let q = query(collection(db, "users"), where("email", "==", email), limit(1));
    const user = await getDocs(q);
    if (user.docs.length == 0) {
      // console.log(user.docs[0].data(),user.docs.length)
      return res.json({ status: "user with this email doesnot exist" })
    }
    let userfetch = user.docs[0]
    
    const data = {
      id: userfetch.id
    }
    const authToken = jwt.sign(data, JWT_SECRET);
    res.json({ status: "User loggedin", authToken: authToken })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured")

  }

})

router.post('/getuser', fillter, async (req, res) => {
  try {
    const userId = req.user.id;
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    // const user= await User.findById(userId).select("-password")
    if (!docSnap.exists()) {
      return res.json({ status: "User not found" })
    }
    let user = docSnap.data();
    delete user.password;
    res.json({ status: "user found", user,userId:docSnap.id })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured")
  }
})

router.delete("/deleteuser", fillter, async (req, res) => {
  const userId = req.user.id;
  try {

    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(404).send("Unauthorized");
    }
    await deleteDoc(doc(db, "users", userId));
    res.json({ success: "Your account has been deleted", deleteduser: docSnap.data() });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});

router.put('/updateuser', fillter, async (req, res) => {
  const { email, password, name,contact } = req.body;
  const userId = req.user.id
  try {

    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(404).json({ status: "Unauthorized" });
    }
    let user=docSnap.data()
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password ? req.body.password : "", salt)

    await updateDoc(docRef, { email: email ? email : user.email, password: password ? secPass : user.password, name: name ? name : user.name ,contact: contact ? contact : user.contact});
    let updateduser={ email: email ? email : user.email, password: password ? secPass : user.password, name: name ? name : user.name ,contact: contact ? contact : user.contact}
    
    res.json({ status: "User info Updated", updatedinfo: updateduser })
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error Occured");
  }
})
export default router