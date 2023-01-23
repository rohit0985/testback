const express = require("express")
const TodoRouter = express.Router()
const { getTodo, addTodo, deleteTodo, editTodo }  = require("../Controllers/todos.controller")
const {authenticate} = require("../MiddleWares/authenticate")


TodoRouter.get("/", authenticate, getTodo)
TodoRouter.post("/add", authenticate, addTodo)
TodoRouter.delete("/delete/:todoId", authenticate, deleteTodo)
TodoRouter.patch("/edit/:todoId", authenticate, editTodo)

module.exports = {TodoRouter}