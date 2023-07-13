import express from 'express'
import fetchuser from '../middleware/fetchuser.js'
import db from "../firebase-config.js";
import { collection, query, where, getDocs, getDoc, addDoc, doc, onSnapshot, limit, deleteDoc,updateDoc } from "firebase/firestore";
const router = express.Router()

router.post("/fetchallBookingUser",fetchuser, async (req, res) => {
  try {
    
    let q = query(collection(db, "booking"), where("user", "==", req.user.id));
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
router.post("/fetchallBookingHost/:id",fetchuser, async (req, res) => {
  try {
    const docRef = doc(db, "hosting", req.params.id);
    const docSnap = await getDoc(docRef);
    console.log(docSnap.data().user.toString() ,req.user.id)
    if (docSnap.data().user.toString() !== req.user.id) {
      return res.status(401).send("not authorised");
    }
    let q = query(collection(db, "booking"), where("hostId", "==", req.params.id));
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
router.post("/fetchBooking/:id",fetchuser, async (req, res) => {
  try {
    
    const hostId=req.params.id
      const docRef = doc(db, "booking", hostId);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        return res.status(404).send("Not found");
      }
      if (docSnap.data().user.toString() !== req.user.id) {
        return res.status(401).send("not authorised");
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
  "/addBooking/:id",
  fetchuser,
  async (req, res) => {
    try {
      console.log(req.params.id)
      const {checkin,checkout,adults,children,infants,bookedon,price,totalbedorrooms,comments,reviews,bed,room,rd,pan,phone,name,ispaid,minimumDown,paymentUpi,orderId,txnToken} = req.body;
      const hostId=req.params.id;
     const booking=await addDoc(collection(db,"booking"),{
      checkin,checkout,adults,children,infants,rd,bookedon,bed,orderId,txnToken,room,price,totalbedorrooms,comments,reviews,pan,phone,name,ispaid,minimumDown,paymentUpi,user:req.user.id,hostId:hostId
     })

      res.json({bookId:booking.id});

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  }
);

router.put("/updateBooking/:id",fetchuser, async (req, res) => {
  const {checkin,checkout,adults,children,infants,bookedon,price,totalbedorrooms,comments,reviews,bed,room,rd,pan,phone,name,ispaid,minimumDown,paymentUpi,orderId,txnToken} = req.body;
    try {
   
      const bookId=req.params.id
      const docRef = doc(db, "booking", bookId);
      const docSnap = await getDoc(docRef);
       
        if (!docSnap.exists()) {
          return res.status(404).send("Not found");
        }
        if (docSnap.data().user.toString() !== req.user.id) {
          return res.status(401).send("not authorised");
        }
        const host=docSnap.data()
        const updatedbooking=await updateDoc(docRef,{checkin:checkin?checkin:host.checkin,checkout:checkout?checkout:host.checkout,comments:comments?comments:host.comments,reviews:reviews?reviews:host.reviews,price:price?price:host.price,bookedon:bookedon?bookedon:host.bookedon,infants:infants?infants:host.infants,adults:adults?adults:host.adults,children:children?children:host.children,bed:bed?bed:host.bed,room:room?room:host.room,totalbedorrooms:totalbedorrooms?totalbedorrooms:host.totalbedorrooms,rd:rd?rd:host.rd,pan:pan?pan:host.pan,phone:phone?phone:host.phone,
        
          orderId:orderId?orderId:host.orderId,
          txnToken:txnToken?txnToken:host.txnToken,
          name:name?name:host.name,
          ispaid:ispaid?ispaid:host.ispaid,
          minimumDown:minimumDown?minimumDown:host.minimumDown,
          paymentUpi:paymentUpi?paymentUpi:host.paymentUpi
        
        
        });
        res.json({status:"Hosting info Updated",updatedinfo:updatedbooking})
    } catch (error) {
        console.error(error);
    res.status(500).send("Internal Server Error Occured");
    }
});

router.post("/deleteBooking/:id",fetchuser, async (req, res) => {

  try {
   
    const bookId=req.params.id
    const docRef = doc(db, "booking", bookId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      return res.status(404).send("Not found");
    }
    
    if (docSnap.data().user.toString() !== req.user.id) {
      return res.status(401).send("not authorised");
    }
     await deleteDoc(docRef)
    res.json({ success: "Hosting has been deleted", booking: docSnap.data() });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});

router.post("/deleteallbookings",fetchuser, async (req, res) => {

  try {
  
    let q = query(collection(db, "booking"), where("user", "==", req.user.id));
    const bookings= await getDocs(q);
    if (bookings.docs.length===0) {
      return res.send("Not found");
    }
    let arr1=bookings.docs.map((e)=>{
      let obj=e.data()
      obj['id']=e.id
        return (
          obj)
    })
    let arr2=await Promise.all(arr1);
   
   let a=0
    while(a<arr2.length){
      const docRef = doc(db, "booking",arr2[a].id );
     await deleteDoc(docRef)
     a=a+1
    }
    res.json({ success: "all bookings has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});
export default router