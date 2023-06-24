import express from 'express'
import fetchuser from '../middleware/fetchuser.js'
import db from "../firebase-config.js";
import { collection, query, where, getDocs, getDoc, addDoc, doc, onSnapshot, limit, deleteDoc,updateDoc } from "firebase/firestore";
const router = express.Router()

router.get("/fetchallHosting",fetchuser, async (req, res) => {
  try {
    
    let q = query(collection(db, "hosting"), where("user", "==", req.user.id));
    const hosting = await getDocs(q);
    let arr1=hosting.docs.map((e)=>{
        return (
          e.data())
    })
    let arr2=await Promise.all(arr1);
    res.json({allhost:arr2})
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
      const {title,description,price,discount,people,rooms,lat,lon,ammeneties,photos,contact,security} = req.body;
     const hosting=await addDoc(collection(db,"hosting"),{
      title,description,price,discount,people,rooms,lat,lon,ammeneties,photos,contact,security,user:req.user.id
     })

      res.json({hosting});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  }
);

router.put("/updateHosting/:id",fetchuser, async (req, res) => {
  const {title,description,price,discount,people,rooms,lat,lon,ammeneties,photos,contact,security} = req.body;
    try {
      const userId=req.params.id
      const docRef = doc(db, "users", userId);
      const docSnap = await getDoc(docRef);
       
        if (!docSnap.exists()) {
          return res.status(404).send("Not found");
        }
        if (docSnap.data().user.toString() !== req.user.id) {
          return res.status(401).send("not authorised");
        }
        const host=docSnap.data()
        const updatedhosting=await updateDoc(docRef,{title:title?title:host.title,description:description?description:host.description,price:price?price:host.price,discount:discount?discount:host.discount,people:people?people:host.people,rooms:rooms?rooms:host.rooms,lat:lat?lat:host.lat,lon:lon?lon:host.lon,ammeneties:ammeneties?ammeneties:host.ammeneties,photos:photos?photos:host.photos,contact:contact?contact:host.contact,security:security?security:host.security},{new:true});
        res.json({status:"Hosting info Updated",updatedinfo:updatedhosting})
    } catch (error) {
        console.error(error);
    res.status(500).send("Internal Server Error Occured");
    }
});

router.delete("/deleteHosting/:id",fetchuser, async (req, res) => {

  try {
   
    const hostId=req.params.id
    const docRef = doc(db, "users", hostId);
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

// router.delete("/deleteallHostings",fetchuser, async (req, res) => {

//   try {
  
//     let Hostings = await Hosting.find();
//     if (!Hostings[0]) {
//       return res.status(404).send("Not found");
//     }
    
//     if (Hostings[0].user.toString() !== req.user.id) {
//       return res.status(401).send("not authorised");
//     }
   
//     while(Hostings!==null)
//     Hostings = await Hosting.findOneAndDelete() ;
//     res.json({ success: "all Hosting has been deleted" });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error Occured");
//   }
// });
export default router