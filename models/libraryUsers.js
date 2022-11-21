const mongoose = require("mongoose");
const schema = mongoose.Schema;

const usersschema = new schema({
  
    email: { type: String, requied: true },
    password: { type: Number, requied: true },
    date:{type:Date,default:Date.now()}

});
let myDATA = mongoose.model("myLibraryUsers", usersschema);
module.exports = myDATA;