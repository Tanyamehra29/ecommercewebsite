import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from "./components/AdminProtectedRoute";


import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyOrders from "./pages/MyOrders";
import Wishlist from "./pages/Wishlist";


import AdminDashboard from "./pages/AdminDashboard";
import AdminOrders from "./pages/AdminOrders";
import AddProduct from "./pages/AddProduct";
import ManageProducts from "./pages/ManageProducts";
import EditProduct from "./pages/EditProduct";



function App(){


return(

<>


<Navbar />


<Routes>


{/* PUBLIC ROUTES */}


<Route
path="/"
element={<Home />}
/>


<Route
path="/products"
element={<Products />}
/>


<Route
path="/product/:id"
element={<ProductDetails />}
/>


<Route
path="/cart"
element={<Cart />}
/>


<Route
path="/login"
element={<Login />}
/>


<Route
path="/signup"
element={<Signup />}
/>





{/* USER ROUTES */}


<Route

path="/checkout"

element={

<ProtectedRoute>

<Checkout />

</ProtectedRoute>

}

/>




<Route

path="/myorders"

element={

<ProtectedRoute>

<MyOrders />

</ProtectedRoute>

}

/>




<Route

path="/wishlist"

element={

<ProtectedRoute>

<Wishlist />

</ProtectedRoute>

}

/>







{/* ADMIN ROUTES */}



<Route

path="/admin"

element={

<AdminProtectedRoute>

<AdminDashboard />

</AdminProtectedRoute>

}

/>





<Route

path="/admin/orders"

element={

<AdminProtectedRoute>

<AdminOrders />

</AdminProtectedRoute>

}

/>





<Route

path="/admin/products"

element={

<AdminProtectedRoute>

<ManageProducts />

</AdminProtectedRoute>

}

/>





<Route

path="/admin/add-product"

element={

<AdminProtectedRoute>

<AddProduct />

</AdminProtectedRoute>

}

/>





<Route

path="/admin/edit-product/:id"

element={

<AdminProtectedRoute>

<EditProduct />

</AdminProtectedRoute>

}

/>







{/* NOT FOUND */}



<Route

path="*"

element={

<h1

style={{

textAlign:"center",

marginTop:"50px"

}}

>

404 - Page Not Found

</h1>

}

/>




</Routes>



<Footer />


</>


);


}


export default App;