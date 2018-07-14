const express = require('express');
const Router = express.Router();

const UserController = require('./controller')

Router.get("/:id", (req,res)=>{
    let id = req.params.id
    UserController.getUser(id)
                  .then(user => res.send({success:1,user}))
                  .catch(err => {
                      console.log(err)
                      res.status(500).send({success:0,errMsg:"get user fail"})
                  })
})

Router.post("/", (req ,res) => {
    console.log(req.body)
    UserController
        .createUser(req.body)
        .then(userCreated => res.status(201).send({success:1, user:userCreated}))
        .catch(err => {
            console.log(err);
            res.status(500).send({success:0,errMsg:err})
        })
})

Router.put("/:id", (req,res)=>{
    UserController.updateUser(req.params.id)
                  .then(user => res.status(201).send({success:1,user}))
                  .catch(err =>{
                      console.log(err)
                      res.status(500).send({success:0,errMsg:err})
                  })
})

module.exports = Router;