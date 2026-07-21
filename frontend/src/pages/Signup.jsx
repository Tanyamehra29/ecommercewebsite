import { useState } from "react";
import axios from "axios";
import {useNavigate,Link} from "react-router-dom";
import toast from "react-hot-toast";

import "../styles/Auth.css";


function Signup(){


const navigate=useNavigate();


const [form,setForm]=useState({

name:"",
email:"",
password:""

});



const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};





const submit=async(e)=>{


e.preventDefault();



try{


await axios.post(

"https://ecommercewebsite-kt1z.onrender.com",

form

);



toast.success(

"Account Created ✅"

);


navigate("/login");


}


catch(error){


toast.error(

error.response?.data?.message ||

"Signup Failed"

);


}



};




return(


<div className="auth-container">


<div className="auth-card">


<h1>

Create Account 🚀

</h1>


<p>

Join ShopEase today

</p>



<form onSubmit={submit}>


<input

name="name"

placeholder="Full Name"

value={form.name}

onChange={handleChange}

required

/>



<input

type="email"

name="email"

placeholder="Email"

value={form.email}

onChange={handleChange}

required

/>



<input

type="password"

name="password"

placeholder="Password"

value={form.password}

onChange={handleChange}

required

/>



<button>

Signup

</button>


</form>



<p>

Already have account?

<Link to="/login">

 Login

</Link>

</p>


</div>


</div>


);


}


export default Signup;