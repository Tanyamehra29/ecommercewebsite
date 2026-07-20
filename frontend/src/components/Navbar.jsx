import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";

import { CartContext } from "../context/CartContext";

import "../styles/Navbar.css";


function Navbar(){


const navigate = useNavigate();

const [open,setOpen] = useState(false);


const {cart}=useContext(CartContext);



const user = JSON.parse(
  localStorage.getItem("user")
);



const totalItems = cart.reduce(
  (sum,item)=> sum + item.quantity,
  0
);



const closeMenu = ()=>{

  setOpen(false);

};



const handleLogout=()=>{


localStorage.removeItem("token");

localStorage.removeItem("user");


navigate("/login");


window.location.reload();


};





return(


<nav className="navbar">



<Link

to="/"

className="logo"

onClick={closeMenu}

>

🛒 ShopEase

</Link>





<div

className="menu-btn"

onClick={()=>setOpen(!open)}

>

{open ? "✖" : "☰"}

</div>






<ul

className={open ? "nav-links active" : "nav-links"}

>



<li>

<Link

to="/"

onClick={closeMenu}

>

Home

</Link>

</li>





<li>

<Link

to="/products"

onClick={closeMenu}

>

Products

</Link>

</li>





<li>

<Link

to="/cart"

onClick={closeMenu}

>

🛒 Cart ({totalItems})

</Link>

</li>





{

user &&

<li>

<Link

to="/wishlist"

onClick={closeMenu}

>

❤️ Wishlist

</Link>

</li>

}







{

user ?


<>



<li>

<Link

to="/myorders"

onClick={closeMenu}

>

📦 Orders

</Link>

</li>






{

user.isAdmin &&

<>


<li>

<Link

to="/admin"

onClick={closeMenu}

>

📊 Dashboard

</Link>

</li>




<li>

<Link

to="/admin/orders"

onClick={closeMenu}

>

📦 Manage Orders

</Link>

</li>





<li>

<Link

to="/admin/add-product"

onClick={closeMenu}

>

➕ Add Product

</Link>

</li>





<li>

<Link

to="/admin/products"

onClick={closeMenu}

>

🛍 Products

</Link>

</li>



</>


}






<li className="welcome-user">

👋 {user.name}

</li>






<li>

<button

className="logout-btn"

onClick={handleLogout}

>

Logout

</button>

</li>



</>




:



<>



<li>

<Link

to="/login"

onClick={closeMenu}

>

Login

</Link>

</li>





<li>

<Link

to="/signup"

onClick={closeMenu}

>

Signup

</Link>

</li>



</>


}



</ul>



</nav>


);


}


export default Navbar;