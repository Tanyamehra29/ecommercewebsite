import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";

dotenv.config();

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

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products Added Successfully");

    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedProducts();