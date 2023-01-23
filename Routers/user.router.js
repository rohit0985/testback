const express = require("express")
const UserRouter = express.Router()
const { allUsers, deleteUser, userSignup, userSignin } = require("../Controllers/users.controller")



UserRouter.get("/", allUsers)
UserRouter.post("/signup", userSignup)
UserRouter.post("/signin", userSignin)
UserRouter.post("/signin", deleteUser)

module.exports = {UserRouter}