import express from "express";
import Razorpay from "razorpay";

const router = express.Router();

console.log("Razorpay Key:", process.env.RAZORPAY_KEY_ID);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
router.post("/create-order", async (req,res)=>{
  try{
    const options = {
      amount: req.body.amount * 100,
      currency: "INR",
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  }catch(error){
    res.status(500).json(error);
  }
});

export default router;