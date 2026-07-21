import { useState, useEffect } from "react";
import API from "../api";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";

import "../styles/Products.css";


function Products() {


  const [products,setProducts] = useState([]);

  const [search,setSearch] = useState("");

  const [category,setCategory] = useState("All");

  const [sort,setSort] = useState("");

  const [loading,setLoading] = useState(true);





  useEffect(()=>{


    const fetchProducts = async()=>{


      try{


        const res = await API.get("/products");

        console.log(
          "Products:",
          res.data
        );



        if(Array.isArray(res.data)){


          const validProducts = res.data.filter(
            item=>item._id
          );


          setProducts(validProducts);


        }
        else{


          setProducts([]);


        }



      }


      catch(error){


        console.log(

          "Product Fetch Error:",
          error

        );


        setProducts([]);


      }


      finally{


        setLoading(false);


      }


    };



    fetchProducts();



  },[]);







  let filteredProducts = products.filter((item)=>{


    const searchMatch =

      item.title
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      );




    const categoryMatch =

      category==="All" ||

      item.category
      ?.toLowerCase()
      ===
      category.toLowerCase();




    return searchMatch && categoryMatch;



  });







  if(sort==="low"){


    filteredProducts.sort(

      (a,b)=>
      a.price-b.price

    );


  }






  if(sort==="high"){


    filteredProducts.sort(

      (a,b)=>
      b.price-a.price

    );


  }







  if(loading){


    return <Loader/>;


  }







  return (


    <div className="products-page">





      <div className="products-header">



        <h1>

          🛍️ Explore Products

        </h1>




        <p>

          Find the best products at amazing prices

        </p>



      </div>









      <div className="filter-section">





        <input


          type="text"


          placeholder="🔍 Search products..."


          value={search}


          onChange={
            (e)=>
            setSearch(e.target.value)
          }


        />









        <select


          value={category}


          onChange={
            (e)=>
            setCategory(e.target.value)
          }


        >


          <option value="All">

            All

          </option>



          <option value="Shoes">

            Shoes

          </option>



          <option value="Electronics">

            Electronics

          </option>



          <option value="Mobiles">

            Mobiles

          </option>



          <option value="Headphones">

            Headphones

          </option>




        </select>









        <select


          value={sort}


          onChange={
            (e)=>
            setSort(e.target.value)
          }


        >



          <option value="">


            Sort By


          </option>





          <option value="low">


            Price Low → High


          </option>





          <option value="high">


            Price High → Low


          </option>





        </select>





      </div>









      <h3 className="product-count">


        {filteredProducts.length} Products Found



      </h3>









      <div className="product-grid">





        {


          filteredProducts.length > 0 ?



          filteredProducts.map((product)=>(



            <ProductCard


              key={product._id}


              product={product}


            />



          ))



          :



          <h2>

            No Products Available 😔

          </h2>



        }





      </div>







    </div>



  );


}



export default Products;