import { useState, useContext } from "react";
import API from "../api";

import { CartContext } from "../context/CartContext";

import "../styles/Checkout.css";

function Checkout() {

  const { cart, clearCart } = useContext(CartContext);

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const [loading, setLoading] = useState(false);

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {

    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    });

  };

  const placeOrder = async (e) => {

    e.preventDefault();

    if (loading) return;

    if (cart.length === 0) {
      alert("Cart is empty ❌");
      return;
    }

    setLoading(true);

    try {

      const response = await API.post(

        "/orders",

        {
          customer,

          products: cart.map((item) => ({
            product: item._id,
            quantity: item.quantity
          })),

          totalPrice,

          paymentStatus: "Pending"
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }

      );

      console.log("Order Response:", response.data);

      clearCart();

      alert("Order Placed Successfully ✅");

      window.location.href = "/myorders";

    } catch (error) {

      console.log(
        "ORDER ERROR:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
        "Order Failed ❌"
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="checkout">

      <h1>
        Checkout 🛒
      </h1>

      <form onSubmit={placeOrder}>

        <input
          name="name"
          placeholder="Full Name"
          value={customer.name}
          onChange={handleChange}
          required
        />

        <input
          name="phone"
          placeholder="Phone Number"
          value={customer.phone}
          onChange={handleChange}
          required
        />

        <textarea
          name="address"
          placeholder="Delivery Address"
          value={customer.address}
          onChange={handleChange}
          required
        />

        <h2>
          Total: ₹{totalPrice}
        </h2>

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Placing Order..."
            : "Place Order 🛒"}
        </button>

      </form>

    </div>

  );

}

export default Checkout;