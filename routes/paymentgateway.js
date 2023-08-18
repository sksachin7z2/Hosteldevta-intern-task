import express from 'express'
import Razorpay from 'razorpay';
const router=express.Router();

router.post('/create',async(req,res)=>{

    try {
        // order_id: "OD454703034437", amount: 300, currency: "INR", payment_capture: 1
        const instance = new Razorpay ( {
        key_id: process.env.KEYID,
        key_secret: process.env.KEYSECRET,
        });
        const { order_id, amount, payment_capture, currency } = req.body;
        const options = {
        amount: amount*100 ,
        currency: currency,
        receipt: order_id,
        payment_capture: payment_capture,
        };
        const order = await instance.orders.create(options);
        if (!order) return res.status (500).send("something occured");
        res.status (200).json ({ success: true, data: order });
        } catch (err) {
        console.log(err);
        }
})
router.post('/getDetails',async(req,res)=>{
    try {
        const instance = new Razorpay ({
            key_id: process.env.KEYID,
            key_secret: process.env.KEYSECRET,
        });
        const { id} = req.body;
        const order = await instance.payments.fetch(id);
        if (!order) return res.status (500).send("something occured");
        res.status (200).json({ success: true, data: order });
        } catch (err) {
        console.log(err);
        }
})
export default router