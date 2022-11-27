import React, {useState} from "react"
import './login.css'
import axios from 'axios'
import {Link} from "react-router-dom"

//import { useNavigate } from "react-router-dom"

const Login=({setloginuser})=>{

    //const navigate=useNavigate()

    const [user,setUser]=useState({
        
        email:"",
        password:""
    })

    const handleChange= e =>{
        
        const {name,value}=e.target
        setUser({
            ...user,
            [name]: value
        })
    }


    const login = () => {
        axios.post("http://localhost:9002/login", user)
        .then(res => {
            alert(res.data.message)
            setloginuser(res.data.user)
            //navigate("/")
        })
    }

  

    return(
        <div className="login">
            {console.log(user)}
            <h1>Login</h1>
            <input type='text' name='email' value={user.email} onChange={handleChange} placeholder="Enter your Email" ></input>
            <input type='password' name='password' value={user.password} onChange={handleChange} placeholder="Enter Password" ></input>
            <div className="button" onClick={login}>Login</div>
            <div>or</div>
            <div className="button" ><Link to="/register">Register</Link></div>
            
        </div>
        //onClick={()=> navigate("/register")}
    )

}
export default Login