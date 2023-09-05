import express from 'express'
import fetchuser from '../middleware/fetchuser.js'
import db from "../firebase-config.js";
import { collection, query, where, getDocs, getDoc, addDoc, doc, onSnapshot, limit, deleteDoc,updateDoc } from "firebase/firestore";
const router = express.Router()

router.post("/fetchalltransactionuser",fetchuser, async (req, res) => {
  try {
    
    let q = query(collection(db, "transaction"), where("user", "==", req.user.id));
    const hosting = await getDocs(q);
    let arr1=hosting.docs.map((e)=>{
      let obj=e.data()
      obj['id']=e.id
        return (
          obj)
    })
    let arr2=await Promise.all(arr1);
    res.json({alltransaction:arr2})
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }

});
router.post("/fetchalltransactionhost/:id",fetchuser, async (req, res) => {
  try {
    const docRef = doc(db, "hosting", req.params.id);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data().user.toString() ,req.user.id)
    if (docSnap.data().user.toString() !== req.user.id) {
      return res.status(401).send("not authorised");
    }
    let q = query(collection(db, "transaction"), where("hostId", "==", req.params.id));
    const hosting = await getDocs(q);
    let arr1=hosting.docs.map((e)=>{
      let obj=e.data()
      obj['id']=e.id
        return (
          obj)
    })
    let arr2=await Promise.all(arr1);
    res.json({alltransaction:arr2})
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }

});
// router.post("/fetchtransaction/:id",fetchuser, async (req, res) => {
//   try {
    
//     const hostId=req.params.id
//       const docRef = doc(db, "transaction", hostId);
//       const docSnap = await getDoc(docRef);
//       if (!docSnap.exists()) {
//         return res.status(404).send("Not found");
//       }
//       if (docSnap.data().user.toString() !== req.user.id) {
//         return res.status(401).send("not authorised");
//       }
//       let obj=docSnap.data();
//       obj['id']=docSnap.id
//       res.json({host:obj})
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal Server Error Occured");
//   }

// });


router.post(
  "/addTransaction/:id/:bid",
  fetchuser,
  async (req, res) => {
    try {
      console.log(req.params.id)
      const {bookedon,dormtitle,ispaid,paymentUpi,orderId,txnToken,amount} = req.body;
      const hostId=req.params.id;
      const bookId=req.params.bid
     const transaction=await addDoc(collection(db,"transaction"),{
      amount,bookedon,orderId,txnToken,ispaid,paymentUpi,user:req.user.id,hostId:hostId,bookId:bookId,dormtitle
     })

      res.json({transactionId:transaction.id});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  }
);

// router.put("/updateBooking/:id/:bid",fetchuser, async (req, res) => {
//     const {bookedon,dormtitle,ispaid,paymentUpi,orderId,txnToken} = req.body;
//     try {
   
//       const hostId=req.params.id
//       const bookId=req.params.bid
//       const docRef = doc(db, "transaction", bookId);
//       const docSnap = await getDoc(docRef);
       
//         if (!docSnap.exists()) {
//           return res.status(404).send("Not found");
//         }
//         if (docSnap.data().user.toString() !== req.user.id) {
//           return res.status(401).send("not authorised");
//         }
//         const host=docSnap.data()
//         const updatedbooking=await updateDoc(docRef,{checkin:checkin?checkin:host.checkin,checkout:checkout?checkout:host.checkout,comments:comments?comments:host.comments,reviews:reviews?reviews:host.reviews,price:price?price:host.price,bookedon:bookedon?bookedon:host.bookedon,infants:infants?infants:host.infants,adults:adults?adults:host.adults,children:children?children:host.children,bed:bed?bed:host.bed,room:room?room:host.room,totalbedorrooms:totalbedorrooms?totalbedorrooms:host.totalbedorrooms,rd:rd?rd:host.rd,pan:pan?pan:host.pan,phone:phone?phone:host.phone,
        
//           orderId:orderId?orderId:host.orderId,
//           txnToken:txnToken?txnToken:host.txnToken,
//           name:name?name:host.name,
//           ispaid:ispaid?ispaid:host.ispaid,
//           minimumDown:minimumDown?minimumDown:host.minimumDown,
//           paymentUpi:paymentUpi?paymentUpi:host.paymentUpi
        
        
//         });
//         res.json({status:"Hosting info Updated",updatedinfo:updatedbooking})
//     } catch (error) {
//         console.error(error);
//     res.status(500).send("Internal Server Error Occured");
//     }
// });

router.delete("/deletetransaction/:id",fetchuser, async (req, res) => {

  try {
   
    const transactionId=req.params.id
    const docRef = doc(db, "transaction", transactionId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return res.status(404).send("Not found");
    }
    
    if (docSnap.data().user.toString() !== req.user.id) {
      return res.status(401).send("not authorised");
    }
     await deleteDoc(docRef)
    res.json({ success: "Hosting has been deleted", transaction: docSnap.data() });
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