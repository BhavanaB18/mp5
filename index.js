//const express=require("express");
//const cors=require("cors");
//const mongoose=require("mongoose'");
import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app=express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/loginregisterDB",{useNewUrlParser:true,useUnifiedTopology:true},
()=>{
    console.log('connection successful');
})


const userSchema= new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User=new mongoose.model("User",userSchema)
//Routes
app.post('/login',(req,res)=>{
    const {email,password}=req.body
    User.findOne({email:email},(err,user)=>{
        if (user){
            if(password===user.password){
                res.send({message:"Login Successful",user:user})
            }
            else{
                res.send({message:"Password didn't match"})
            }

        }else{
            res.send({message:"User not registered"})
        }
    })
})

app.post('/register',(req,res)=>{
    //res.send("My API register")
    //console.log(req.body)

    //to check whether already registered or not we are using a function called findone


    const {name,email,password}=req.body
    User.findOne({email:email},(err,user)=>{
        if (user){
            res.send({message:"User already registered"})
        }
        else{
            const user=new User({
                // name=name,
                // email=email,
                // password=password
                name,
                email,
                password
            })
            user.save(err=>{
                if (err){
                    res.send(err)
                }else{
                    res.send({message:"Successfully Registered, Please Login now"})
                }
            })

        }
    })
    



})

app.listen(9002,()=>{
    console.log("server running on port 9002")
})