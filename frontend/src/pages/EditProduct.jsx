import { useEffect, useState } from "react";
import API from "../api";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import "../styles/EditProduct.css";

function EditProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    discount: "",
    rating: "",
    image: ""
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {

      const res = await API.get(`/products/${id}`);

      setProduct(res.data);
      setPreview(res.data.image);

    } catch (error) {

      console.log(error);
      toast.error("Product Load Failed");

    }
  };

  const handleChange = (e) => {

    setProduct({
      ...product,
      [e.target.name]: e.target.value
    });

  };

  const handleImage = (e) => {

    const file = e.target.files[0];

    setImage(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }

  };

  const updateProduct = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("title", product.title);
      formData.append("price", product.price);
      formData.append("category", product.category);
      formData.append("description", product.description);
      formData.append("discount", product.discount);
      formData.append("rating", product.rating);

      if (image) {
        formData.append("image", image);
      }

      await API.put(
        `/products/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      toast.success("Product Updated Successfully ✅");

      navigate("/admin/products");

    } catch (error) {

      console.log(error);
      toast.error("Update Failed ❌");

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="edit-product">

      <div className="edit-card">

        <h1>✏️ Edit Product</h1>

        <form onSubmit={updateProduct}>

          <input
            name="title"
            placeholder="Product Name"
            value={product.title}
            onChange={handleChange}
            required
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            value={product.price}
            onChange={handleChange}
            required
          />

          <select
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            <option value="Shoes">Shoes</option>
            <option value="Mobiles">Mobiles</option>
            <option value="Electronics">Electronics</option>
            <option value="Headphones">Headphones</option>
            <option value="Watches">Watches</option>
          </select>

          <input
            name="discount"
            type="number"
            placeholder="Discount"
            value={product.discount}
            onChange={handleChange}
          />

          <input
            name="rating"
            type="number"
            max="5"
            placeholder="Rating"
            value={product.rating}
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
          />

          <h3>Product Image</h3>

          {preview && (
            <img
              src={preview}
              className="preview-image"
              alt="product"
            />
          )}

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
          />

          <button disabled={loading}>
            {loading ? "Updating..." : "Update Product 🚀"}
          </button>

        </form>

      </div>

    </div>

  );

}

export default EditProduct;