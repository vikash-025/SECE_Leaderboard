const mongoose = require("mongoose");

const loginSchema = mongoose.Schema({
  email: { type: String, required: true },
  password:{type:String, required:true}
//   type: { type: String, required: true },
}, {timestamps : true});
const loginModel = mongoose.model("Admin", loginSchema);
module.exports = loginModel;
