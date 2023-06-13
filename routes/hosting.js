const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Hosting = require("../model/Hosting");


router.get("/fetchallHosting",fetchuser, async (req, res) => {
  try {
    const Hosting = await Hosting.find({ user: req.user.id });
    res.json({allhost:Hosting});
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
     const hosting=await Hosting.create({
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
        let host = await Hosting.findById(req.params.id)
       
        if (!host) {
          return res.status(404).send("Not found");
        }
        if (host.user.toString() !== req.user.id) {
          return res.status(401).send("not authorised");
        }
        const updatedhosting=await Hosting.findByIdAndUpdate(req.params.id,{title:title?title:host.title,description:description?description:host.description,price:price?price:host.price,discount:discount?discount:host.discount,people:people?people:host.people,rooms:rooms?rooms:host.rooms,lat:lat?lat:host.lat,lon:lon?lon:host.lon,ammeneties:ammeneties?ammeneties:host.ammeneties,photos:photos?photos:host.photos,contact:contact?contact:host.contact,security:security?security:host.security},{new:true});
        res.json({status:"Hosting info Updated",updatedinfo:updatedhosting})
    } catch (error) {
        console.error(error);
    res.status(500).send("Internal Server Error Occured");
    }
});

router.delete("/deleteHosting/:id",fetchuser, async (req, res) => {

  try {
   
    let hosting = await Hosting.findById(req.params.id);
    if (!hosting) {
      return res.status(404).send("Not found");
    }
    
    if (hosting.user.toString() !== req.user.id) {
      return res.status(401).send("not authorised");
    }
    hosting = await Hosting.findByIdAndDelete(req.params.id);
    res.json({ success: "Hosting has been deleted", Hosting: Hosting });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});

router.delete("/deleteallHostings",fetchuser, async (req, res) => {

  try {
  
    let Hostings = await Hosting.find();
    if (!Hostings[0]) {
      return res.status(404).send("Not found");
    }
    
    if (Hostings[0].user.toString() !== req.user.id) {
      return res.status(401).send("not authorised");
    }
   
    while(Hostings!==null)
    Hostings = await Hosting.findOneAndDelete() ;
    res.json({ success: "all Hosting has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});
module.exports = router;
