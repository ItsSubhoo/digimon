const mongoose=require("mongoose");
const plm =require("passport-local-mongoose");


// BYftq4T3bzyS663N


const uri= "mongodb+srv://subhajitlaiofficial:sJZpUL0YI4aGRE88@digimon.aatfs0o.mongodb.net/?retryWrites=true&w=majority&appName=digimon"
mongoose.connect(uri);

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
