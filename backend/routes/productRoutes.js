import express from "express";

import {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
} from "../controllers/productController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();


// ================= PUBLIC ROUTES =================

// Get All Products
router.get("/", getProducts);

// Get Single Product
router.get("/:id", getSingleProduct);


// ================= ADMIN ROUTES =================

// Create Product
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  createProduct
);

// Update Product
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  updateProduct
);

// Delete Product
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  deleteProduct
);


// ================= USER ROUTES =================

// Add Review
router.post(
  "/:id/review",
  authMiddleware,
  addReview
);

export default router;