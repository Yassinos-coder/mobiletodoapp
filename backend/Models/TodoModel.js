const mongoose = require('mongoose')

const Todo = mongoose.Schema({
    ownerID: {
        type: String,
        required: true,
    },
    created_at: {
        type: String,
        required: true,
    },
    due_at: {
        type: String,
        required: true,
    },
    task: {
        type: String,
        required: true,
    },
})

const TodoModel = mongoose.model('userTodos', Todo)
module.exports = TodoModel