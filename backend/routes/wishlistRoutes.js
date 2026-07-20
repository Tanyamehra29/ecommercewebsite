import express from "express";

import {
  addWishlist,
  getWishlist,
  removeWishlist,
} from "../controllers/wishlistController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// ================= ADD TO WISHLIST =================
router.post(
  "/",
  authMiddleware,
  addWishlist
);

// ================= GET WISHLIST =================
router.get(
  "/",
  authMiddleware,
  getWishlist
);

// ================= REMOVE FROM WISHLIST =================
router.delete(
  "/:productId",
  authMiddleware,
  removeWishlist
);

export default router;