import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Loader from "../components/Loader";

import "../styles/ManageProducts.css";


function ManageProducts(){


const [products,setProducts]=useState([]);

const [search,setSearch]=useState("");

const [loading,setLoading]=useState(true);


const navigate=useNavigate();





const fetchProducts=async()=>{


try{


const res=await axios.get(

"http://localhost:5000/api/products"

);


setProducts(res.data);


}

catch(error){

console.log(error);

toast.error("Products Load Failed");

}

finally{

setLoading(false);

}


};





useEffect(()=>{

fetchProducts();

},[]);






const deleteProduct=async(id)=>{


const confirmDelete = window.confirm(
"Are you sure you want to delete this product?"
);



if(!confirmDelete)

return;




try{


await axios.delete(

`http://localhost:5000/api/products/${id}`,

{

headers:{

Authorization:

`Bearer ${localStorage.getItem("token")}`

}

}

);




toast.success(
"Product Deleted Successfully 🗑️"
);



fetchProducts();



}

catch(error){


console.log(error);


toast.error(
"Delete Failed ❌"
);


}


};







const filteredProducts = products.filter((item)=>

item.title
?.toLowerCase()
.includes(search.toLowerCase())

);






if(loading)

return <Loader/>;






return(


<div className="manage-products">



<h1>
🛍 Manage Products
</h1>





<div className="top-bar">


<input

className="product-search"

placeholder="🔍 Search Product..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>



<button

className="add-product-btn"

onClick={()=>navigate("/admin/add-product")}

>

➕ Add Product

</button>



</div>







{

filteredProducts.length===0 ?


<div className="empty-products">

<h2>
No Products Found 😔
</h2>

</div>



:


<table>



<thead>

<tr>

<th>
Image
</th>


<th>
Name
</th>


<th>
Price
</th>


<th>
Category
</th>


<th>
Actions
</th>


</tr>

</thead>






<tbody>



{

filteredProducts.map((product)=>(



<tr key={product._id}>


<td>

<img

src={product.image}

alt={product.title}

/>

</td>




<td>

{product.title}

</td>





<td>

₹{product.price}

</td>





<td>

{product.category}

</td>





<td>


<button

className="edit-btn"

onClick={()=>navigate(

`/admin/edit-product/${product._id}`

)}

>

✏️ Edit

</button>






<button

className="delete-btn"

onClick={()=>deleteProduct(product._id)}

>

🗑 Delete

</button>



</td>




</tr>



))

}



</tbody>



</table>



}



</div>


);


}


export default ManageProducts;