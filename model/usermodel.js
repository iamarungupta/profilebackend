const mongoose=require('mongoose');
require('../config/dbcon.js');


const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  about: {
    type: String,
  },
  education: {
    type: String,
  },
  currentPos: {
    type: String,
  },
  image: {
    type: String
  },
  links: {
    linkedin:{
      type:String,
    },
    github:{
      type:String,
    },
    facebook:{
      type:String,
    },
    twitter:{
      type:String,
    },
    instagram:{
      type:String,
    },
    website:{
      type:String,
    },
  }    
  ,
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});
module.exports=mongoose.model("User",userSchema);