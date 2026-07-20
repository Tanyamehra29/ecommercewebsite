import express from "express";


import {

  placeOrder,

  getAllOrders,

  getMyOrders,

  updateOrderStatus

} from "../controllers/orderController.js";


import authMiddleware from "../middleware/authMiddleware.js";

import adminMiddleware from "../middleware/adminMiddleware.js";



const router = express.Router();




// User Place Order

router.post(

  "/",

  authMiddleware,

  placeOrder

);




// User My Orders

router.get(

  "/myorders",

  authMiddleware,

  getMyOrders

);





// Admin Get All Orders

router.get(

  "/",

  authMiddleware,

  adminMiddleware,

  getAllOrders

);





// Admin Update Order Status

router.put(

  "/:id",

  authMiddleware,

  adminMiddleware,

  updateOrderStatus

);



export default router;