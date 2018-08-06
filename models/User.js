const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const User = new Schema({
    login:{
        type:String,
        unique: true,
        required: true,
    },
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    mail:{
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    salt: String
});

User.methods.setPassword = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 1000,64,'sha512').toString('hex');
};

User.methods.validPassword = function(password){
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000,64,'sha512').toString('hex');
    return this.password === hash;
}



module.exports = user = mongoose.model('user', User);
