import React,{useState} from "react";
import axios from "axios";
import './register.css';
import {Link} from "react-router-dom"


const Register=()=>{

    //const navigate=useNavigate()

    const [user,setUser]=useState({
        name:"",
        email:"",
        password:"",
        confirmpassword:""
    })

    const handleChange= e =>{
        
        const {name,value}=e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register=()=>{
        const {name,email,password,confirmpassword}=user
        if (name && email && password && (password===confirmpassword)){
            //alert("posted")
            axios.post("http://localhost:9002/register",user)
            .then(res=>{
                alert(res.data.message)
                //navigate("/login")
            })
        }
        else{
            alert("invalid input")
        }
       
    }



    return(
        <div className="register">
            {
                console.log('User',user)
            }
            <h1>Register</h1>
            <input type='text' name='name' value={user.name} placeholder="Enter your Name" onChange={handleChange}></input>
            <input type='text' name='email' value={user.email} placeholder="Enter your Email" onChange={handleChange}></input>
            
            <input type='password' name='password' value={user.password} placeholder="Enter Password" onChange={handleChange}></input>
            <input type='password' name='confirmpassword' value={user.confirmpassword} placeholder="Confirm Password" onChange={handleChange}></input>
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" ><Link to="/login">Login</Link></div>
        </div>
        // onClick={()=> navigate("/Login")}
    )
}

export default Register