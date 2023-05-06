const {Router} = require('express')
const {APIAuth} = require('../Helpers/APIAuth')
const TodoModel = require('../Models/TodoModel')

const todoAPI = Router()

todoAPI.get('/todos/GetUserTodoList/:uuid', APIAuth,async(req, res) => {
    let uuid = req.params.uuid
    try {
        const todoList = await TodoModel.find({ownerID: uuid})
        res.send({message:'success', todoList: todoList})
    } catch (err) {
        console.error(`Error in GetUserTodoList API ${err}`)
        res.send({message:'error'})
    }
})

todoAPI.post('/todos/AddTodo', APIAuth, async(req, res) => {
    let newTodoData = req.body
    try {
        const newTodoToDB = new TodoModel(newTodoData)
        await newTodoToDB.save()
        res.send({message:'addSuccess', todoList: newTodoData})
    } catch (err) {
        console.error(`Error in AddTodo API ${err}`)
        res.send({message:'error'})
    }
})

todoAPI.delete('/todos/DeleteTask/:uuid/:taskID', APIAuth, async(req, res) => {
    let taskID = req.params.taskID
    let uuid = req.params.uuid
    try {
       await TodoModel.deleteOne({_id: taskID}) 
       const updatedTodoList = await TodoModel.find({ownerID: uuid})
       res.send({message:'succes', todoList: updatedTodoList})
    } catch (err) {
        console.error(`DeleteTask API ${err}`)
    }
})


module.exports = todoAPI