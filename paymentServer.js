import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app=express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())


mongoose.connect("mongodb://localhost:27017/paymentDetails",{useNewUrlParser:true,useUnifiedTopology:true},
()=>{
    console.log('connection successful');
})



const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    address:String,
    city:String,
    state:String,
    zipcode:Number,

})

const User=new mongoose.model("User",userSchema)
app.post('/proceed',(req,res)=>{
    const {name,email,address,city,state,zipcode}=req.body
    console.log(name,email)
    if(!name  || !email || !address || !city || !state || !zipcode){
        return res.json({message:" server Please fill the all the field"})
    }
    else{
        const user=new User({
            name,
            email,
            address,
            city,
            state,
            zipcode
        })
        user.save(err=>{
            if(err){
                res.send(err)
            }
            else{
                res.send({message:"Payment Successfully Done"})
            }
        })
    }


    
})



app.listen(9002,()=>{
    console.log("server running on port 9002")
})