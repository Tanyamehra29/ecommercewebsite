import { useEffect, useState, useContext } from "react";
import API from "../api";
import toast from "react-hot-toast";

import { CartContext } from "../context/CartContext";
import Loader from "../components/Loader";

import "../styles/Wishlist.css";

function Wishlist() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(CartContext);

  const token = localStorage.getItem("token");

  const fetchWishlist = async () => {

    try {

      const res = await API.get(
        "/wishlist",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const validProducts = (res.data.products || []).filter(
        (item) => item && item._id
      );

      setProducts(validProducts);

    } catch (error) {

      console.log("Wishlist Error:", error);

      toast.error("Wishlist Load Failed");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchWishlist();

  }, []);

  const removeWishlist = async (id) => {

    try {

      await API.delete(
        `/wishlist/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      toast.success("Removed from Wishlist 💔");

      setProducts(
        products.filter(
          (item) => item._id !== id
        )
      );

    } catch (error) {

      console.log(error);

      toast.error("Remove Failed ❌");

    }

  };

  const handleCart = (product) => {

    addToCart(product);

    toast.success("Added To Cart 🛒");

  };

  if (loading) {

    return <Loader />;

  }

  return (

    <div className="wishlist-container">

      <h1>
        ❤️ My Wishlist
      </h1>

      {products.length === 0 ? (

        <div className="empty-wishlist">

          <h2>
            Wishlist is Empty 😔
          </h2>

          <p>
            Add products you love ❤️
          </p>

        </div>

      ) : (

        <div className="wishlist-grid">

          {products.map((product) => (

            <div
              className="wishlist-card"
              key={product._id}
            >

              <img
                src={
                  product.image ||
                  "https://via.placeholder.com/300"
                }
                alt={product.title}
              />

              <h2>{product.title}</h2>

              <p>₹{product.price}</p>

              <div className="wishlist-actions">

                <button
                  onClick={() => handleCart(product)}
                >
                  🛒 Add Cart
                </button>

                <button
                  onClick={() => removeWishlist(product._id)}
                >
                  ❌ Remove
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}

export default Wishlist;