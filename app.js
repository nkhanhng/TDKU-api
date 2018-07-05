const express = require('express')
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const postRouter = require('./modules/api/post/router')

app.use(bodyParser.json({ extended: false }));

mongoose.connect("mongodb://admin:123a123a@ds125181.mlab.com:25181/exchangememories",function(){
    console.log("connect success")
})

app.get("/",(req,res)=>{
    res.send("Hello")
})

app.use('/api/post', postRouter)

app.use(express.static('./public'));

const port = process.env.PORT || 3000

app.listen(port)