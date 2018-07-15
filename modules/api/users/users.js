const mongoose = require("mongoose")
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    email: {type: String,
            required: true, 
            validate: {
                validator: function(value) {
                const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return regex.test(value);
                },
                message: "{VALUE} is not a valid email address!"
            }
    },
    avatar: {type: Buffer},
    // contentType: {type: String, required: true}
})

userSchema.pre("save", function(next){
    if(this.passwordChange || !this.__v){
        const saltRounds = 10;
        const plainPassword = this.password || this.passwordChange;
        
        bcrypt.genSalt(saltRounds)
            .then(salt => bcrypt.hash(plainPassword,salt))
            .then(hashPassword => {
                this.password = hashPassword;
                next()
            })
            .catch(err => next(err));
    } else next();
})

module.exports = mongoose.model("users", userSchema)