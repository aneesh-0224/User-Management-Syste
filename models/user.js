const mongoose = require('mongoose')
const schema = mongoose.Schema
const UserSchema = new schema({
    firstname:String,
    lastname:String,
    email:String,
    phone:String
})

module.exports = mongoose.model('User',UserSchema)