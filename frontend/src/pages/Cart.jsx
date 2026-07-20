import { useContext } from "react";
import { Link } from "react-router-dom";

import { CartContext } from "../context/CartContext";
import "../styles/Cart.css";


function Cart() {


const {
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeItem
}=useContext(CartContext);



const total = cart.reduce(

(sum,item)=>

sum + item.price * item.quantity,

0

);



return(


<div className="cart-container">


<h1 className="cart-title">

🛒 My Cart

</h1>



{
cart.length===0 ?


<div className="empty-cart">

<h2>
Cart is Empty 🛒
</h2>


<Link to="/products">

<button className="checkout-btn">

Continue Shopping

</button>

</Link>


</div>



:


<>



<div className="cart-list">



{

cart.map((item)=>(


<div

className="cart-item"

key={item._id}

>


<img

src={item.image}

alt={item.title}

/>



<div className="cart-info">


<h3>

{item.title}

</h3>


<p>

Price: ₹{item.price}

</p>



<p>

Subtotal:

₹{item.price * item.quantity}

</p>



<div className="quantity">


<button

onClick={()=>increaseQuantity(item._id)}

>

+

</button>



<span>

{item.quantity}

</span>



<button

onClick={()=>decreaseQuantity(item._id)}

>

-

</button>



</div>


</div>





<button

className="remove-btn"

onClick={()=>removeItem(item._id)}

>

Remove ❌

</button>



</div>



))

}



</div>





<h2 className="total">

Total: ₹{total}

</h2>



<Link to="/checkout">


<button className="checkout-btn">

Proceed To Checkout 🛒

</button>


</Link>



</>


}



</div>


);

}


export default Cart;