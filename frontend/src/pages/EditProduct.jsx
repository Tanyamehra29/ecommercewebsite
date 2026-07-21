import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import "../styles/EditProduct.css";


function EditProduct(){


const {id}=useParams();

const navigate=useNavigate();


const [product,setProduct]=useState({

title:"",
price:"",
category:"",
description:"",
discount:"",
rating:"",
image:""

});


const [image,setImage]=useState(null);

const [preview,setPreview]=useState("");

const [loading,setLoading]=useState(false);







useEffect(()=>{

fetchProduct();

},[]);







const fetchProduct=async()=>{


try{


const res=await axios.get(

`http://localhost:5000/api/products/${id}`

);


setProduct(res.data);

setPreview(res.data.image);



}

catch(error){

console.log(error);

toast.error("Product Load Failed");

}


};







const handleChange=(e)=>{


setProduct({

...product,

[e.target.name]:e.target.value

});


};







const handleImage=(e)=>{


const file=e.target.files[0];


setImage(file);


if(file){

setPreview(
URL.createObjectURL(file)
);

}


};








const updateProduct=async(e)=>{


e.preventDefault();



try{


setLoading(true);



const formData=new FormData();



Object.keys(product).forEach((key)=>{


if(key !== "image"){

formData.append(

key,

product[key]

);

}


});





if(image){

formData.append(
"image",
image
);

}





await axios.put(


`https://ecommercewebsite-kt1z.onrender.com${id}`,

formData,

{

headers:{

Authorization:

`Bearer ${localStorage.getItem("token")}`,


"Content-Type":

"multipart/form-data"

}

}

);





toast.success(
"Product Updated Successfully ✅"
);



navigate("/admin/products");



}

catch(error){


console.log(error);


toast.error(
"Update Failed ❌"
);


}

finally{

setLoading(false);

}



};









return(



<div className="edit-product">



<div className="edit-card">





<h1>

✏️ Edit Product

</h1>






<form onSubmit={updateProduct}>


<input

name="title"

placeholder="Product Name"

value={product.title}

onChange={handleChange}

required

/>







<input

name="price"

type="number"

placeholder="Price"

value={product.price}

onChange={handleChange}

required

/>







<select

name="category"

value={product.category}

onChange={handleChange}

>


<option>
Shoes
</option>

<option>
Mobiles
</option>

<option>
Electronics
</option>

<option>
Headphones
</option>

<option>
Watches
</option>


</select>







<input

name="discount"

type="number"

placeholder="Discount"

value={product.discount}

onChange={handleChange}

/>







<input

name="rating"

type="number"

max="5"

placeholder="Rating"

value={product.rating}

onChange={handleChange}

/>







<textarea

name="description"

placeholder="Description"

value={product.description}

onChange={handleChange}

/>







<h3>
Product Image
</h3>





{

preview &&

<img

src={preview}

className="preview-image"

alt="product"

/>

}







<input

type="file"

accept="image/*"

onChange={handleImage}

/>







<button disabled={loading}>


{

loading

?

"Updating..."

:

"Update Product 🚀"

}



</button>




</form>





</div>



</div>



);


}


export default EditProduct;