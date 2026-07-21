import { useContext } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import API from "../api";
import { CartContext } from "../context/CartContext";

import "../styles/ProductCard.css";

function ProductCard({ product }) {

  const { addToCart } = useContext(CartContext);

  if (!product || !product._id) {
    return null;
  }

  const addToWishlist = async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Please Login First ❌");
      return;
    }

    try {

      await API.post(
        "/api/wishlist",
        {
          productId: product._id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Added to Wishlist ❤️");

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Wishlist Failed ❌"
      );

    }

  };

  const finalPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  return (

    <div className="product-card">

      {product.discount > 0 && (
        <div className="discount">
          -{product.discount}% OFF
        </div>
      )}

      <img
        src={product.image || "https://via.placeholder.com/300"}
        alt={product.title}
      />

      <h3>{product.title}</h3>

      <div className="rating">
        ⭐ {Number(product.rating || 0).toFixed(1)}
      </div>

      <div className="price-box">

        <p>₹{finalPrice}</p>

        {product.discount > 0 && (
          <del>₹{product.price}</del>
        )}

      </div>

      <div className="product-actions">

        <button
          onClick={() => {
            addToCart(product);
            toast.success("Added to Cart 🛒");
          }}
        >
          🛒 Add Cart
        </button>

        <button
          className="wishlist-btn"
          onClick={addToWishlist}
        >
          ❤️
        </button>

      </div>

      <Link to={`/product/${product._id}`}>
        View Details →
      </Link>

    </div>

  );

}

export default ProductCard;