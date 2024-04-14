import express from 'express'
import fetchuser from '../middleware/fetchuser.js'
import db from "../firebase-config.js";
import { collection, query, where, getDocs, getDoc, addDoc, doc, onSnapshot, limit, deleteDoc,updateDoc } from "firebase/firestore";
const router = express.Router()

router.post("/fetchglobalHosting", async (req, res) => {
  try {
    
    let q = query(collection(db, "hosting"));
    const hosting = await getDocs(q);
    let arr1=hosting.docs.map((e)=>{
      let obj=e.data()
      obj['id']=e.id
        return (
          obj)
    })
    let arr2=await Promise.all(arr1);
    res.json({allhost:arr2})
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }

});
router.post("/fetchallHosting",fetchuser, async (req, res) => {
  try {
    
    let q = query(collection(db, "hosting"), where("user", "==", req.user.id));
    const hosting = await getDocs(q);
    let arr1=hosting.docs.map((e)=>{
      let obj=e.data()
      obj['id']=e.id
        return (
          obj)
    })
    let arr2=await Promise.all(arr1);
    res.json({allhost:arr2})
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }

});
router.post("/fetchHosting/:id", async (req, res) => {
  try {
    
    const hostId=req.params.id
      const docRef = doc(db, "hosting", hostId);
      const docSnap = await getDoc(docRef);
      // if (docSnap.data().user.toString() !== req.user.id) {
      //   return res.status(401).send("not authorised");
      // }
      if (!docSnap.exists()) {
        return res.status(404).send("Not found");
      }
      let obj=docSnap.data();
      obj['id']=docSnap.id
      res.json({host:obj})
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }

});


router.post(
  "/addHosting",
  fetchuser,
  async (req, res) => {
    try {
      const {title,description,price,discount,bathrooms,toilets,rooms,lat,status,lon,address,ammeneties,photos,contact,security,totalbed} = req.body;
      console.log(status)
     const hosting=await addDoc(collection(db,"hosting"),{
      title,description,price,discount,rooms,bathrooms,toilets,lat,lon,ammeneties,status,address,photos,contact,security,totalbed,user:req.user.id
     })

      res.json({host:hosting.id});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  }
);

router.put("/updateHosting/:id",fetchuser, async (req, res) => {
  const {title,description,price,discount,rooms,lat,lon,bathrooms,toilets,ammeneties,photos,contact,security,address,status,totalbed} = req.body;
    try {
   
      const hostId=req.params.id
      const docRef = doc(db, "hosting", hostId);
      const docSnap = await getDoc(docRef);
       
        if (!docSnap.exists()) {
          return res.status(404).send("Not found");
        }
        // if (docSnap.data().user.toString() !== req.user.id) {
        //   return res.status(401).send("not authorised");
        // }
        const host=docSnap.data()
        const updatedhosting=await updateDoc(docRef,{title:title?title:host.title,bathrooms:bathrooms?bathrooms:host.bathrooms,toilets:toilets?toilets:host.toilets,description:description?description:host.description,price:price?price:host.price,discount:discount?discount:host.discount,rooms:rooms?rooms:host.rooms,lat:lat?lat:host.lat,lon:lon?lon:host.lon,ammeneties:ammeneties?ammeneties:host.ammeneties,photos:photos?photos:host.photos,contact:contact?contact:host.contact,security:security?security:host.security,address:address?address:host.address,status:status?status:host.status,totalbed:totalbed?totalbed:host.totalbed});
        res.json({status:"Hosting info Updated",updatedinfo:updatedhosting})
    } catch (error) {
        console.error(error);
    res.status(500).send("Internal Server Error Occured");
    }
});

router.post("/deleteHosting/:id",fetchuser, async (req, res) => {

  try {
    const hostId=req.params.id
    const docRef = doc(db, "hosting", hostId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return res.status(404).send("Not found");
    }
    
    if (docSnap.data().user.toString() !== req.user.id) {
      return res.status(401).send("not authorised");
    }
     await deleteDoc(docRef)
    res.json({ success: "Hosting has been deleted", Hosting: docSnap.data() });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});

router.post("/deleteallhostings",fetchuser, async (req, res) => {

  try {
  
    let q = query(collection(db, "hosting"), where("user", "==", req.user.id));
    const hostings= await getDocs(q);
    if (hostings.docs.length===0) {
      return res.send("Not found");
    }
    let arr1=hostings.docs.map((e)=>{
      let obj=e.data()
      obj['id']=e.id
        return (
          obj)
    })
    let arr2=await Promise.all(arr1);
   
   let a=0
    while(a<arr2.length){
      const docRef = doc(db, "hosting",arr2[a].id );
     await deleteDoc(docRef)
     a=a+1
    }
    res.json({ success: "all hostings has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});
export default router