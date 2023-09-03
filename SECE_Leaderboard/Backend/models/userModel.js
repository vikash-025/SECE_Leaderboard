const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  CFid: { type: String, required: true },
//   CCid: { type: String, required: true },
}, {timestamps : true});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;