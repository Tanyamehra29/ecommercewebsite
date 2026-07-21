import { useEffect, useState } from "react";
import axios from "axios";

import "../styles/AdminOrders.css";


function AdminOrders(){


const [orders,setOrders]=useState([]);



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


};




useEffect(()=>{

fetchOrders();

},[]);






const updateStatus=async(id,status)=>{


try{


await axios.put(

`https://ecommercewebsite-kt1z.onrender.com${id}`,

{

status

},

{

headers:{

Authorization:

`Bearer ${localStorage.getItem("token")}`

}

}

);



alert("Status Updated ✅");


fetchOrders();



}

catch(error){

console.log(error);

}



};






return(


<div className="admin-orders">


<h1>

📦 Manage Orders

</h1>




{

orders.length===0 ?


<h2>

No Orders Found

</h2>



:


orders.map(order=>(



<div

className="order-card"

key={order._id}

>



<div className="order-header">


<h3>

Order #{order._id.slice(-6)}

</h3>


<span

className={`status ${order.status?.toLowerCase()}`}

>

{order.status}

</span>



</div>





<div className="customer">


<h3>

Customer Details

</h3>


<p>

👤 {order.customer?.name || "Unknown"}

</p>


<p>

📞 {order.customer?.phone || "N/A"}

</p>


<p>

📍 {order.customer?.address || "N/A"}

</p>


</div>






<div className="ordered-products">


<h3>

Products

</h3>



{

order.products?.map((item,index)=>(


<div

key={index}

className="product-row"

>


{

item.product ?

<>

<span>

{item.product.title}

</span>


<span>

× {item.quantity}

</span>

</>


:

<span>

Product Removed

</span>

}


</div>


))


}



</div>





<h2 className="amount">

₹{order.totalPrice}

</h2>




<div className="update-box">


<select


value={order.status}


onChange={(e)=>

updateStatus(

order._id,

e.target.value

)

}


>


<option>

Pending

</option>


<option>

Packed

</option>


<option>

Shipped

</option>


<option>

Delivered

</option>


</select>



</div>





</div>


))


}



</div>


);


}


export default AdminOrders;