import express from "express";

import {
  placeOrder,
  getAllOrders,
  getMyOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

// ================= USER =================

// Place Order
router.post(
  "/",
  authMiddleware,
  placeOrder
);

// My Orders
router.get(
  "/myorders",
  authMiddleware,
  getMyOrders
);

// ================= ADMIN =================

// Get All Orders
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  getAllOrders
);

// Update Order Status
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateOrderStatus
);

export default router;