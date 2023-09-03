const mongoose = require("mongoose");

const contestsSchema = mongoose.Schema({
  contestNumber: { type: String, required: true },
  details:{type:Array}
//   type: { type: String, required: true },
}, {timestamps : true});
const contestsModel = mongoose.model("contests", contestsSchema);
module.exports = contestsModel;
