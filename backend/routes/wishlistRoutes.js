import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  addWishlist,
  getWishlist,
  removeWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

// Add product to wishlist
router.post(
  "/",
  authMiddleware,
  addWishlist
);

// Get user's wishlist
router.get(
  "/",
  authMiddleware,
  getWishlist
);

// Remove product from wishlist
router.delete(
  "/:productId",
  authMiddleware,
  removeWishlist
);

export default router;