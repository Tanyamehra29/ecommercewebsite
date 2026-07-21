import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/AddProduct.css";

function AddProduct() {

  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    rating: "",
    discount: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {

    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });

  };

  const handleImage = (e) => {

    setImage(e.target.files[0]);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const formData = new FormData();

      formData.append("title", product.title);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("description", product.description);
      formData.append("rating", product.rating);
      formData.append("discount", product.discount);

      if (image) {
        formData.append("image", image);
      }

      await axios.post(

       " https://ecommercewebsite-kt1z.onrender.com",

        formData,

        {

          headers: {

            Authorization: `Bearer ${localStorage.getItem("token")}`,

            "Content-Type": "multipart/form-data",

          },

        }

      );

      toast.success("Product Added Successfully ✅");

      setProduct({

        title: "",
        price: "",
        category: "",
        description: "",
        rating: "",
        discount: "",

      });

      setImage(null);

    }

    catch (error) {

      console.log(error);

      toast.error(

        error.response?.data?.message ||

        "Failed to Add Product"

      );

    }

  };

  return (

    <div className="add-product">

      <h1>Add New Product 📦</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={product.title}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={product.category}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={product.description}
          onChange={handleChange}
        />

        <input
          type="number"
          name="rating"
          placeholder="Rating (0-5)"
          min="0"
          max="5"
          step="0.1"
          value={product.rating}
          onChange={handleChange}
        />

        <input
          type="number"
          name="discount"
          placeholder="Discount (%)"
          min="0"
          max="100"
          value={product.discount}
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImage}
          required
        />

        <button type="submit">
          Add Product
        </button>

      </form>

    </div>
  );

}

export default AddProduct;