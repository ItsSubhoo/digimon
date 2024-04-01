const mongoose=require("mongoose");
const plm =require("passport-local-mongoose");


// BYftq4T3bzyS663N


const uri= "mongodb+srv://subhajitlai:eDgqscVY2XR7P5RJ@bloggify.5k9txlb.mongodb.net/digimon"
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
