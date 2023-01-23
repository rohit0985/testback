const mongoose = require("mongoose");
const bcrypt = require("bcrypt")
const {UserModel} = require("../Models/user.model")
const jwt = require("jsonwebtoken")

const userSignup = async (req, res) => {
  const payload = req.body;

  try {
    bcrypt.hash(payload.password, 5, async function(err, hash) {
       payload.password = hash

       const user = new UserModel(payload)
       await user.save()

       res.send(payload)
    });
   
  } catch (err) {
    res.send({ err: "Something went wrong" });
  }
};





const userSignin = async (req, res) => {
    const payload = req.body;
  
  try {

let user = await UserModel.findOne({email : payload.email})
   if(user._id){

    bcrypt.compare(payload.password, user.password, function(err, result) {
       
        if(result){
            var token = jwt.sign({ userId: user._id }, 'secret');
            res.send({"token": token})
        }else{
            res.send({err: "Wrong credentials"})
        }
       
    });
   }
   
  } catch (err) {
    res.send({ err: "Something went wrong" });
  }
};


const allUsers = async (req, res) => {
    const users = await UserModel.find()
  res.send({ users });
  try {
  } catch (err) {
    res.send({ err: "Something went wrong" });
  }
};

const deleteUser = async (req, res) => {
    const {id} = req.params
  try {
    await UserModel.findByIdAndDelete({_id : id})
  } catch (err) {
    res.send({ err: "Something went wrong" });
  }
};

module.exports = { allUsers, deleteUser, userSignup, userSignin };
