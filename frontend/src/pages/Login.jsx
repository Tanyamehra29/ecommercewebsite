import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

import "../styles/Auth.css";


function Login(){

const navigate = useNavigate();


const [form,setForm]=useState({

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


const res=await axios.post(

"http://localhost:5000/api/users/login",

form

);



localStorage.setItem(

"token",

res.data.token

);



localStorage.setItem(

"user",

JSON.stringify(res.data.user)

);



toast.success("Login Successful ✅");


if(res.data.user.isAdmin)

navigate("/admin");

else

navigate("/");


window.location.reload();



}

catch(error){


toast.error(

error.response?.data?.message ||

"Login Failed ❌"

);


}


};





return(


<div className="auth-container">


<div className="auth-card">


<h1>

Welcome Back 👋

</h1>


<p>

Login to continue shopping

</p>




<form onSubmit={submit}>


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

Login

</button>



</form>




<p>

Don't have an account?

<Link to="/signup">

 Signup

</Link>

</p>



</div>


</div>


);


}


export default Login;