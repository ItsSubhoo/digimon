const mongoose=require('mongoose');

const postData=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    caption:String,
    image:String,
    date:
      {      type:Date,
            default:Date.now()
          }
    
  });
  
  const post=mongoose.model("post",postData);


  module.exports = post;