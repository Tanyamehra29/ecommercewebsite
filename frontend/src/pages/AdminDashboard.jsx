
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";


import "../styles/Admin.css";


function AdminDashboard(){


const navigate = useNavigate();



const [stats,setStats]=useState({

totalProducts:0,
totalUsers:0,
totalOrders:0,
totalRevenue:0

});





useEffect(()=>{


const fetchStats=async()=>{


try{


const res=await axios.get(

"http://localhost:5000/api/admin/stats",

{

headers:{

Authorization:

`Bearer ${localStorage.getItem("token")}`

}

}

);



setStats(res.data.stats);



}

catch(error){

console.log(error);

}


};


fetchStats();


},[]);






const chartData=[

{
name:"Jan",
orders:5,
revenue:5000
},

{
name:"Feb",
orders:10,
revenue:12000
},

{
name:"Mar",
orders:15,
revenue:20000
},

{
name:"Apr",
orders:22,
revenue:30000
}

];





return(


<div className="admin-dashboard">



<h1>
📊 Admin Dashboard
</h1>





<div className="stats-grid">



<div className="stat-card">

<h2>📦</h2>

<h3>Total Products</h3>

<p>
{stats.totalProducts}
</p>

</div>





<div className="stat-card">

<h2>🛒</h2>

<h3>Total Orders</h3>

<p>
{stats.totalOrders}
</p>

</div>






<div className="stat-card">

<h2>👥</h2>

<h3>Total Users</h3>

<p>
{stats.totalUsers}
</p>

</div>






<div className="stat-card">

<h2>💰</h2>

<h3>Total Revenue</h3>

<p>
₹{stats.totalRevenue || 0}
</p>

</div>



</div>








{/* SALES CHART */}


<div className="chart-section">


<h2>
Sales Overview 📈
</h2>



<ResponsiveContainer width="100%" height={300}>


<LineChart data={chartData}>


<CartesianGrid strokeDasharray="3 3"/>


<XAxis dataKey="name"/>


<YAxis/>


<Tooltip/>


<Line
type="monotone"
dataKey="revenue"
/>


</LineChart>


</ResponsiveContainer>



</div>








{/* QUICK ACTIONS */}


<div className="admin-actions">


<h2>
Quick Actions
</h2>



<button
onClick={()=>navigate("/admin/add-product")}
>
➕ Add Product
</button>



<button
onClick={()=>navigate("/admin/products")}
>
🛍 Manage Products
</button>



<button
onClick={()=>navigate("/admin/orders")}
>
📦 Manage Orders
</button>



</div>







{/* RECENT ACTIVITY */}


<div className="activity-section">


<h2>
Recent Activity
</h2>


<div className="activity">

🟢 New products added

</div>


<div className="activity">

🟢 Orders received

</div>


<div className="activity">

🟢 New users registered

</div>



</div>





</div>


);


}


export default AdminDashboard;