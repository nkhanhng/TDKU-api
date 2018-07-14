const UserModel = require('./users');
const fs = require('fs')

const createUser = ({ username, password, email }) => 
    new Promise((resolve, reject) => {
        UserModel
            .create({
                username: username,
                password: password,
                email: email
            })
            .then(userCreated => resolve(userCreated._id))
            .catch(err => reject(err))
    })


const updateUser = (userId,{email,avatar,password}) => new Promise((resolve,reject)=>{
    UserModel.findById(userId)
             .then(userFound=>{
                 if(email) userFound[email]= email
                 if(avatar) userFound[avatar] = avatar
                 if(password) userFound.passwordChange = password
             })
             .then(userUpdated => resolve(userUpdated._id))
             .catch(err => reject(err))
})              

const getUser = (userId) => new Promise((resolve,reject)=>{
    UserModel.findById(userId)
             .then(userFound=>resolve(userFound))
             .catch(err => reject(err))
})

module.exports ={
    createUser,
    updateUser,
    getUser
}