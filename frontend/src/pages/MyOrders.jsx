import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

import "../styles/MyOrders.css";


function MyOrders(){

const [orders,setOrders]=useState([]);

const [loading,setLoading]=useState(true);





useEffect(()=>{

fetchOrders();

},[]);





const fetchOrders=async()=>{

try{

const res=await axios.get(

"https://ecommercewebsite-kt1z.onrender.com",

{

headers:{

Authorization:

`Bearer ${localStorage.getItem("token")}`

}

}

);

setOrders(res.data);

}

catch(error){

console.log(error);

}

finally{

setLoading(false);

}

};






const getStatusClass=(status)=>{

switch(status){

case "Delivered":

return "delivered";

case "Shipped":

return "shipped";

case "Packed":

return "packed";

default:

return "pending";

}

};





const getProgress=(status)=>{

switch(status){

case "Pending":

return 25;

case "Packed":

return 50;

case "Shipped":

return 75;

case "Delivered":

return 100;

default:

return 0;

}

};






if(loading){

return <Loader/>;

}





return(

<div className="my-orders">

<h1>

📦 My Orders

</h1>




{

orders.length===0

?

<div className="empty-orders">

<h2>No Orders Yet 😔</h2>

<p>Start shopping to place your first order.</p>

</div>

:

orders.map((order)=>(

<div

className="order-card"

key={order._id}

>

<div className="order-top">

<div>

<h3>

Order #

{order._id.slice(-8)}

</h3>

<p>

📅 {new Date(order.createdAt).toLocaleDateString()}

</p>

</div>

<span

className={`status ${getStatusClass(order.status)}`}

>

{order.status}

</span>

</div>




<div className="progress-box">

<div className="progress">

<div

className="progress-fill"

style={{

width:`${getProgress(order.status)}%`

}}

></div>

</div>

</div>





<div className="products-list">

{

order.products.map((item)=>(

<div

className="product-row"

key={item._id}

>

<img

src={item.product?.image}

alt={item.product?.title}

/>

<div>

<h4>

{item.product?.title}

</h4>

<p>

Quantity : {item.quantity}

</p>

</div>

</div>

))

}

</div>





<div className="order-bottom">

<h2>

₹{order.totalPrice}

</h2>

<p>

{order.products.length} Item(s)

</p>

</div>

</div>

))

}

</div>

);

}

export default MyOrders;