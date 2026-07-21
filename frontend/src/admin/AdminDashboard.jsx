import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import "../styles/Admin.css";

function AdminDashboard() {

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  useEffect(() => {

    fetchDashboard();

  }, []);

  const fetchDashboard = async () => {

    try {

      const res = await axios.get(

        "https://ecommercewebsite-kt1z.onrender.com",

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }

      );

      setStats(res.data.stats);

    }

    catch (error) {

      console.log(error);

      toast.error("Failed to Load Dashboard");

    }

  };

  return (

    <div className="admin-dashboard">

      <h1>
        Admin Dashboard 📊
      </h1>

      <div className="dashboard-cards">

        <div className="dashboard-card">

          <h2>📦</h2>

          <h3>Total Products</h3>

          <p>{stats.totalProducts}</p>

        </div>

        <div className="dashboard-card">

          <h2>🛒</h2>

          <h3>Total Orders</h3>

          <p>{stats.totalOrders}</p>

        </div>

        <div className="dashboard-card">

          <h2>👥</h2>

          <h3>Total Users</h3>

          <p>{stats.totalUsers}</p>

        </div>

        <div className="dashboard-card">

          <h2>💰</h2>

          <h3>Total Revenue</h3>

          <p>₹{stats.totalRevenue}</p>

        </div>

      </div>

      <div className="admin-actions">

        <h2>Quick Actions ⚡</h2>

        <div className="action-buttons">

          <button onClick={() => window.location.href="/admin/add-product"}>
            ➕ Add Product
          </button>

          <button onClick={() => window.location.href="/admin/products"}>
            📦 Manage Products
          </button>

          <button onClick={() => window.location.href="/admin/orders"}>
            🛒 View Orders
          </button>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;