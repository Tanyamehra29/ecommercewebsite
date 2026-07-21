import { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import "../styles/Auth.css";

function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };

  const submit = async (e) => {

    e.preventDefault();

    try {

      await API.post(
        "/users/signup",
        form
      );

      toast.success("Account Created Successfully ✅");

      navigate("/login");

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
        "Signup Failed ❌"
      );

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <h1>
          Create Account 🚀
        </h1>

        <p>
          Join ShopEase today
        </p>

        <form onSubmit={submit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button type="submit">
            Signup
          </button>

        </form>

        <p>
          Already have an account?
          <Link to="/login"> Login</Link>
        </p>

      </div>

    </div>

  );

}

export default Signup;