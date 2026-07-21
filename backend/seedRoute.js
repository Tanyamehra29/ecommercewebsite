import express from "express";
import Product from "./models/Product.js";

const router = express.Router();

const products = [
  {
    title: "Nike Shoes",
    price: 2999,
    category: "Shoes",
    image: "https://picsum.photos/300/250?random=1",
  },
  {
    title: "Smart Watch",
    price: 3999,
    category: "Electronics",
    image: "https://picsum.photos/300/250?random=2",
  },
  {
    title: "Headphones",
    price: 1999,
    category: "Electronics",
    image: "https://picsum.photos/300/250?random=3",
  },
];

router.get("/", async (req, res) => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);

    res.json({
      message: "Products Added Successfully"
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

export default router;