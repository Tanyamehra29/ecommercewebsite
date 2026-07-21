import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import { CartContext } from "../context/CartContext";

import Loader from "../components/Loader";

import "../styles/ProductDetails.css";


function ProductDetails(){


const {id}=useParams();

const navigate = useNavigate();


const [product,setProduct]=useState(null);

const [loading,setLoading]=useState(true);



const {addToCart}=useContext(CartContext);





useEffect(()=>{

fetchProduct();

},[id]);






const fetchProduct = async()=>{


try{


const res = await axios.get(

`https://ecommercewebsite-kt1z.onrender.com${id}`

);


setProduct(res.data);



}

catch(error){


console.log(
"Product Details Error:",
error
);


toast.error("Product Not Found");


}



finally{


setLoading(false);


}


};







const buyNow=()=>{


const token = localStorage.getItem("token");


if(!token){

toast.error("Please Login First");

navigate("/login");

return;

}



addToCart(product);


navigate("/checkout");


};







if(loading){

return <Loader/>;

}





if(!product){

return (

<h2 className="not-found">

Product Not Found

</h2>

);

}







const finalPrice =

product.discount>0

?

product.price -
(product.price*product.discount)/100

:

product.price;







return(


<div className="product-details">





<div className="product-image">


{

product.discount>0 &&

<span className="offer">

-{product.discount}% OFF

</span>

}




<img

src={product.image || 
"https://via.placeholder.com/400"}

alt={product.title}

/>



</div>









<div className="product-info">



<h1>

{product.title}

</h1>





<div className="rating">

⭐ {product.rating || 0}

</div>






<h2 className="price">

₹{finalPrice}

</h2>





{

product.discount>0 &&

<del>

₹{product.price}

</del>

}





<p className="description">

{product.description}

</p>






<div className="buttons">


<button

className="cart-btn"

onClick={()=>{


addToCart(product);


toast.success(
"Added To Cart 🛒"
);


}}

>

🛒 Add To Cart

</button>







<button

className="buy-btn"

onClick={buyNow}

>

⚡ Buy Now

</button>


</div>






<hr/>







<h2>

Customer Reviews

</h2>





{

product.reviews?.length===0 ?


<p>

No Reviews Yet

</p>



:



product.reviews?.map((review)=>(


<div

className="review-box"

key={review._id}

>


<h4>

⭐ {review.rating}

</h4>


<p>

{review.comment}

</p>



</div>


))


}




</div>





</div>


);


}


export default ProductDetails;

    