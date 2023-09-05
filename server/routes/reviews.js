import express from 'express'
import fetchuser from '../middleware/fetchuser.js'
import db from "../firebase-config.js";
import { collection, query, where, getDocs, getDoc, addDoc, doc, onSnapshot, limit, deleteDoc,updateDoc } from "firebase/firestore";
const router = express.Router()


router.post("/fetchallreviews/:id", async (req, res) => {
  try {
    
    let q = query(collection(db, "reviews"), where("hostId", "==", req.params.id));
    const reviews = await getDocs(q);
    let arr1=reviews.docs.map((e)=>{
      let obj=e.data()
      obj['id']=e.id
        return (
          obj)
    })
    let arr2=await Promise.all(arr1);
    console.log(arr2)
    res.json({allreviews:arr2[0]})
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }

});



router.post(
  "/addreviews/:id",
  async (req, res) => {
    try {
      const {reviews} = req.body;
      let q = query(collection(db, "reviews"), where("hostId", "==", req.params.id));
      const reviw = await getDocs(q);
      if(reviw.docs.length>0)
      {
        return res.json({status:"reviews already present"})
      }
    
     const review=await addDoc(collection(db,"reviews"),{
      reviews,hostId:req.params.id
     })

      res.json({host:review.id});
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  }
);

router.post("/updatereviews/:id", async (req, res) => {
  const {reviews} = req.body;
    try {
   
        let q = query(collection(db, "reviews"), where("hostId", "==", req.params.id));
        const docSnap = await getDocs(q);
       
        if (docSnap.docs.length===0) {
          return res.send("Not found");
        } 
         const docRef = doc(db, "reviews", docSnap.docs[0].id);
        // if (docSnap.data().user.toString() !== req.user.id) {
        //   return res.status(401).send("not authorised");
        // }
        const host=docSnap.docs[0].data()
        const updatedhosting=await updateDoc(docRef,{reviews:reviews?reviews:host.reviews});
        res.json({status:"Hosting info Updated",updatedinfo:updatedhosting})
    } catch (error) {
        console.error(error);
    res.status(500).send("Internal Server Error Occured");
    }
});

// router.post("/deleteHosting/:id",fetchuser, async (req, res) => {

//   try {
//     const hostId=req.params.id
//     const docRef = doc(db, "hosting", hostId);
//     const docSnap = await getDoc(docRef);
//     if (!docSnap.exists()) {
//       return res.status(404).send("Not found");
//     }
    
//     if (docSnap.data().user.toString() !== req.user.id) {
//       return res.status(401).send("not authorised");
//     }
//      await deleteDoc(docRef)
//     res.json({ success: "Hosting has been deleted", Hosting: docSnap.data() });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error Occured");
//   }
// });

// router.post("/deleteallhostings",fetchuser, async (req, res) => {

//   try {
  
//     let q = query(collection(db, "hosting"), where("user", "==", req.user.id));
//     const hostings= await getDocs(q);
//     if (hostings.docs.length===0) {
//       return res.send("Not found");
//     }
//     let arr1=hostings.docs.map((e)=>{
//       let obj=e.data()
//       obj['id']=e.id
//         return (
//           obj)
//     })
//     let arr2=await Promise.all(arr1);
   
//    let a=0
//     while(a<arr2.length){
//       const docRef = doc(db, "hosting",arr2[a].id );
//      await deleteDoc(docRef)
//      a=a+1
//     }
//     res.json({ success: "all hostings has been deleted" });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error Occured");
//   }
// });
export default router