const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

username:String,
email:String,
password:String,
partnerCode:String,
partner:String,

latitude:Number,
longitude:Number

});

module.exports = mongoose.model("User",UserSchema);