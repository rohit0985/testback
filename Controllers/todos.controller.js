const mongoose = require('mongoose')
const {TodoModel} = require("../Models/todo.model")
const jwt = require("jsonwebtoken")


const getTodo = async (req, res)=>{
    const token = req.headers?.authorization?.split(" ")[1];
try{
    var decoded = jwt.verify(token, 'secret');
const todos = await TodoModel.find({userId: decoded.userId})
    res.send({ todos });
}catch(err){
    res.send({ err: "Something went wrong" });
}
}

const addTodo = async (req, res)=>{
    const payload = req.body
try{
const task = new TodoModel(payload)
await task.save()
res.send({ payload });
}catch(err){
    res.send({ "err": "Something went wrong" });
}
}

const deleteTodo = async (req, res)=>{
    const {todoId} = req.params
    try{
    await TodoModel.findByIdAndDelete({_id:todoId})
    res.send({ "msg": "Todo deleted" });
    }catch(err){
        res.send({ "err": "Something went wrong" });
    }
}

const editTodo = async (req, res)=>{
    const {todoId} = req.params
    const payload = req.body
    try{
     await TodoModel.findByIdAndUpdate({_id:todoId}, payload)
    res.send({ "msg": "Todo updated" });
    }catch(err){
        res.send({ "err": "Something went wrong" });
    }
}


module.exports = {
    getTodo,
    addTodo,
    deleteTodo,
    editTodo
}