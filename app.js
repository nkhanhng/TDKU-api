const express = require('express')
const app = express();
const mongoose = require('mongoose')

mongoose.connect("mongodb://admin:123a123a@ds125181.mlab.com:25181/exchangememories",function(){
    console.log("connect success")
})

app.get("/",(req,res)=>{
    res.send("Hello")
})

const port = process.env.PORT || 3000

app.listen(port)