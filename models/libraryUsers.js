const mongoose = require("mongoose");
const schema = mongoose.Schema;

const usersschema = new schema({
  
    name: { type: String, requied: true },
    email: { type: String, requied: true },
    password: { type: String, requied: true },
    date:{type:Date,default:Date.now()}

});
let myDATA = mongoose.model("myLibraryUsers", usersschema);
module.exports = myDATA;