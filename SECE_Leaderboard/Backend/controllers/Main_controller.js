const Contests= require("../models/contestsModel")
const Users= require("../models/userModel")
const Login= require("../models/loginModel")
const bodyParser = require("body-parser");
const express = require("express");
const jwt=require("jsonwebtoken");
const { findOneAndDelete } = require("../models/contestsModel");
//const { findByIdAndUpdate } = require("../model/book");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const getAllContests=async(req,res,next)=>{
    let contests;
    try{
        contests=await Contests.find();
    }
    catch(err)
    {
        console.log(err);
    }
    if(!contests){
        return res.status(404).json({message:"No Contests found"});
    }
    return res.status(200).json({contests});
}



const getAllUsers=async(req,res,next)=>{
    let users;
    try{
        users=await Users.find();
    }
    catch(err)
    {
        console.log(users);
        console.log(err);
    }
    if(!users){
        return res.status(404).json({message:"No Users found"});
    }
    return res.status(200).json({users});
}

const addUser=async(req,res,next)=>{
    try {
      const newUser = new Users(req.body)
      await newUser.save()
      res.send('User added successfully')
    } catch (error) {
      res.status(400).json(error);
    }
};

const addContest=async(req,res,next)=>{
    try {
      const newContest = new Contests(req.body)
      await newContest.save()
      res.send('User added successfully')
    } catch (error) {
      res.status(400).json(error);
    }
};
const logIn=async(req,res,next)=>{
    try {
        
        const Credentials= await Login.findOne({ email:req.body.email,password:req.body.password });
        if(Credentials)
        {
            const token=jwt.sign({
                email:Credentials.email,
                password:Credentials.password
            },"Thisisasecret")
            console.log("found")
             res.send(token)
        }
        else
        {
            console.log("Not Found");
            res.send("false");
        }
        //res.send('User added successfully')
      } catch (error) {
        res.status(400).json(error);
      }

}
const deleteUser=async(req,res,next)=>{
    console.log(req.body.CFid)
      await Users.findOneAndDelete({"CFid":req.body.CFid})
      
};
const deleteContest=async(req,res,next)=>{
    console.log(req.body.contestid)
      await Contests.findOneAndDelete({"contestNumber":req.body.contestid})
      
};

exports.getAllContests=getAllContests;
exports.getAllUsers=getAllUsers;
exports.addUser=addUser;
exports.addContest=addContest;
exports.logIn=logIn;
exports.deleteUser=deleteUser;
exports.deleteContest=deleteContest;