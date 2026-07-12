const asyncHnandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bc = require("bcryptjs");
const User = require("../models/userModel");

const registerUser = asyncHnandler(async (req, res) => {
  
  
  const { username, email, password } = req.body;
  const salt = await bc.genSalt(10);
  const hashedPass = await bc.hash(password, salt);
  const user = await User.create({
    username,
    email,
    password: hashedPass,
  });
  if (!username || !email || !password) {
    res.status(400);
    throw new console.error();
  }
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.username,
      email: user.email,
      password : user.password,
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

const loginUser = asyncHnandler(async (req,res)=>{
    const {email,password}=  req.body
    const user = await User.findOne({ email})

    if(user && (await bc.compare(password,user.password))){
        res.json({ _id : user.id, name : user.name, email : user.email, pass : user.password})
    }
    else{
        res.status(400);
        throw new Error('Invalid credentials');
    }
})


module.exports = {registerUser,loginUser}