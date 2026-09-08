const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

const uri = process.env.MONGODB_CONNECTION_STRING || process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_CONNECTION_STRING is required to start the application");
}

mongoose.connect(uri).catch((error) => {
  console.error("[v0] MongoDB connection failed:", error.message);
});

const userData=mongoose.Schema({
  username:String,
  password:String,
  secret:"String",
  email:String,
  name:String,
  profileImage:String,
  contact:Number,
  posts:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"post"
    }
  ]
});


userData.plugin(plm);

const userModel=mongoose.model("user",userData);

module.exports = userModel;
