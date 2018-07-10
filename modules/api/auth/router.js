const express = require('express')
const Router = express.Router();

const authController = require('./controller');

Router.post("/",(req,res)=>{
    authController.login(req.body)
                  .then(userInfo => {
                      req.session.userInfo = userInfo;
                      res.send({
                          success: 1,
                          user: userInfo
                      })
                  })
                  .catch(err => console.log(err))
})

// Router.get("/",(req,res)=>{
//     res.send(req.session.userInfo);
// })

module.exports = Router;