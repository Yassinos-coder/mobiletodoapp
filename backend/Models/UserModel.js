const mongoose = require('mongoose')

const Users = mongoose.Schema({
    avatar: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    flname: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

const UserModel = mongoose.model('users', Users)
module.exports = UserModel