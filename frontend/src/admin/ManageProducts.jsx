import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AdminProducts.css";


function ManageProducts() {


  const [products, setProducts] = useState([]);

  const navigate = useNavigate();



  // Fetch Products

  const fetchProducts = async () => {

    try {

      const res = await axios.get(
        "http://localhost:5000/api/products"
      );

      setProducts(res.data);

    } 
    catch (error) {

      console.log("Fetch Error:", error);

    }

  };




  useEffect(() => {

    fetchProducts();

  }, []);






  // Delete Product

  const deleteProduct = async (id) => {


    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );


    if(!confirmDelete) return;



    try {


      await axios.delete(
        `http://localhost:5000/api/products/${id}`
      );


      alert("Product Deleted Successfully ✅");


      fetchProducts();


    } 
    catch(error) {


      console.log("Delete Error:", error);


      alert("Delete Failed ❌");

    }


  };







  return (

    <div className="manage-products">


      <h1>
        Manage Products 📦
      </h1>




      <table>


        <thead>

          <tr>

            <th>Image</th>

            <th>Name</th>

            <th>Price</th>

            <th>Category</th>

            <th>Description</th>

            <th>Action</th>


          </tr>


        </thead>





        <tbody>


          {

            products.map((product)=>(


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

                  {product.description}

                </td>






                <td>


                  <button

                    className="edit-btn"

                    onClick={()=>{

                      navigate(
                        `/admin/edit-product/${product._id}`
                      );

                    }}

                  >

                    Edit

                  </button>





                  <button

                    className="delete-btn"

                    onClick={()=>deleteProduct(product._id)}

                  >

                    Delete

                  </button>



                </td>




              </tr>


            ))

          }



        </tbody>



      </table>




    </div>


  );

}



export default ManageProducts;