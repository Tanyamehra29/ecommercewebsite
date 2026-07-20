import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

import "../styles/Home.css";


function Home() {


  const [products,setProducts] = useState([]);

  const [loading,setLoading] = useState(true);



  useEffect(()=>{


    const fetchProducts = async()=>{


      try{


        const res = await axios.get(
          "http://localhost:5000/api/products"
        );


        setProducts(res.data);


      }
      catch(error){

        console.log(
          "Product Fetch Error:",
          error
        );

      }
      finally{

        setLoading(false);

      }


    };


    fetchProducts();


  },[]);




  if(loading)
    return <Loader />;




  const categories=[

    {
      icon:"👟",
      name:"Shoes"
    },

    {
      icon:"📱",
      name:"Mobiles"
    },

    {
      icon:"🎧",
      name:"Headphones"
    },

    {
      icon:"⌚",
      name:"Watches"
    }

  ];




return(

<div className="home">



{/* HERO */}

<section className="hero">


<div className="hero-content">


<h1>

Shop Smarter,
<br/>
Live Better 🛍️

</h1>


<p>

Discover premium products at amazing prices.
Shoes, electronics and more delivered to your doorstep.

</p>



<Link to="/products">

<button className="hero-btn">

Shop Now →

</button>

</Link>



</div>




<div className="hero-image">


<img

src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800"

alt="shopping"

/>


</div>



</section>





{/* CATEGORY */}

<section className="categories">


<h2>

Explore Categories

</h2>



<div className="category-grid">


{

categories.map((item,index)=>(


<div

className="category-card"

key={index}

>


<div className="category-icon">

{item.icon}

</div>


<h3>

{item.name}

</h3>


</div>


))

}



</div>


</section>






{/* PRODUCTS */}


<section className="products-section">


<div className="section-title">


<h2>

Trending Products

</h2>


<Link to="/products">

View All →

</Link>


</div>





<div className="product-grid">


{

products.length > 0 ?


products.slice(0,4).map(product=>(


<ProductCard

key={product._id}

product={product}

/>


))


:

<h3>

No Products Available

</h3>


}


</div>



</section>







{/* FEATURES */}



<section className="features">


<h2>

Why Choose ShopEase?

</h2>



<div className="feature-grid">



<div className="feature-card">

<h2>🚚</h2>

<h3>
Fast Delivery
</h3>

<p>
Quick and reliable delivery.
</p>

</div>




<div className="feature-card">

<h2>🔒</h2>

<h3>
Secure Payment
</h3>

<p>
Safe online transactions.
</p>

</div>





<div className="feature-card">

<h2>⭐</h2>

<h3>
Quality Products
</h3>

<p>
Trusted products at best prices.
</p>

</div>




<div className="feature-card">

<h2>🔄</h2>

<h3>
Easy Returns
</h3>

<p>
Simple return process.
</p>

</div>



</div>


</section>





{/* REVIEWS */}


<section className="reviews">


<h2>

What Customers Say

</h2>



<div className="review-grid">



<div className="review-card">

<h3>
⭐⭐⭐⭐⭐
</h3>

<p>
Amazing shopping experience.
</p>

<b>
- Rahul
</b>

</div>





<div className="review-card">

<h3>
⭐⭐⭐⭐⭐
</h3>

<p>
Fast delivery and good quality.
</p>

<b>
- Priya
</b>

</div>





<div className="review-card">

<h3>
⭐⭐⭐⭐⭐
</h3>

<p>
Best ecommerce website.
</p>

<b>
- Aman
</b>

</div>



</div>



</section>





</div>


);


}


export default Home;