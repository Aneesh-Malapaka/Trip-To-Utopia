const mongoose = require('mongoose');


let userSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    tokens: [String],
    isAdmin: Boolean,
    userAuthorized: Boolean
})

const User = mongoose.model('users', userSchema);




module.exports = { User };