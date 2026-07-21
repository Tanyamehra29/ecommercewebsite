import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import "../styles/AddProduct.css";


function AddProduct(){


const navigate = useNavigate();



const [product,setProduct]=useState({

title:"",
price:"",
category:"",
description:"",
discount:"",
rating:""

});



const [image,setImage]=useState(null);

const [preview,setPreview]=useState("");

const [loading,setLoading]=useState(false);






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








const submit=async(e)=>{


e.preventDefault();


try{


setLoading(true);



const formData=new FormData();



Object.keys(product).forEach((key)=>{


formData.append(

key,

product[key]

);


});




if(image){

formData.append(
"image",
image
);

}






await axios.post(

"https://ecommercewebsite-kt1z.onrender.com",

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
"Product Added Successfully 🎉"
);



navigate("/admin/products");



}

catch(error){


console.log(error);


toast.error(

error.response?.data?.message ||

"Product Add Failed ❌"

);


}


finally{

setLoading(false);

}


};









return(



<div className="add-product">



<div className="product-form">



<h1>

➕ Add New Product

</h1>






<form onSubmit={submit}>


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

placeholder="Price ₹"

value={product.price}

onChange={handleChange}

required

/>







<select

name="category"

value={product.category}

onChange={handleChange}

required

>


<option value="">

Select Category

</option>


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

placeholder="Discount %"

value={product.discount}

onChange={handleChange}

/>







<input

name="rating"

type="number"

placeholder="Rating ⭐"

max="5"

value={product.rating}

onChange={handleChange}

/>







<textarea

name="description"

placeholder="Product Description"

value={product.description}

onChange={handleChange}

required

/>







<label className="upload-label">

📸 Upload Product Image

</label>




<input

type="file"

accept="image/*"

onChange={handleImage}

/>






{

preview &&

<img

className="image-preview"

src={preview}

alt="preview"

/>

}





<button disabled={loading}>


{

loading

?

"Adding..."

:

"Add Product 🚀"

}


</button>






</form>




</div>



</div>



);


}


export default AddProduct;