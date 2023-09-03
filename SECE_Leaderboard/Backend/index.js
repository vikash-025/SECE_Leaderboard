//jshint esversion:6
const http=require("http")
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors=require("cors");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
const port=process.env.PORT || 5000;
const MainController=require("./controllers/Main_controller");
const { response } = require("express");
//password="cEvvQeRooSpdMd6B"
mongoose.connect("mongodb+srv://arpit:nTld3Ybe3YMYUX6f@arpit.vdirgui.mongodb.net/SeceLeaderBoard").then(()=>console.log("Connected Successfully")).then(()=>app.listen(port,()=>console.log("Listening at port 5000"))).catch((err)=>console.log(err));
// nTld3Ybe3YMYUX6f
app.get("/contests", MainController.getAllContests);
app.get("/users", MainController.getAllUsers);
app.post("/adduser", MainController.addUser);
app.post("/deleteuser", MainController.deleteUser);
app.post("/deletecontest", MainController.deleteContest);
app.post("/addcontest", MainController.addContest);
app.post("/login", MainController.logIn);




































// const userSchema = {
//     email: String,
//     password: String
// };
// const User=new mongoose.model("User",userSchema); 
// app.get('/register',function(req,res)
// {
//     console.log("HI");
// })
// app.post("/register",function(req,res)
// {
//     const newUser=new User({
//         email:req.body.username,
//         password: req.body.password
//     })
//     newUser.save(function(err){
//         if(err)
//         {
//             console.log(err);
//         }
//         else
//         {
            
//         }
//     })
// })
// app.get("/books", booksController.getAllbooks);
// app.post("/books", booksController.addBook);
// app.get("/books/:id", booksController.bookbyid);
// app.put("/books/:id", booksController.updateBook);
// app.delete("/books/:id", booksController.deleteBook);
// app.listen(3000, function(){
//  console.log("Server started on port 3000.");
// });