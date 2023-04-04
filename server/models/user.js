const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
    name: {
        type:String,
        requrired:true
    },
    email: {
        type:String,
        requrired:true
    },
    username: {
        type:String,
        requrired:true
    },
    password: {
        type:String,
        requrired:true
    },
    image:{
        type: String
    },
    tokens: [
        {
         token: {
             type: String,
         }
        }
     ]
});
userSchema.pre("save", async function(next){
    const user= this;
    if(user.isModified("password")){
        user.password = await bcrypt.hash(user.password,8);
    }
    next();
});
// login validation ------------- npm i bcryptjs
userSchema.statics.findByCredentail = async (username,password) =>{
    const user = await User.findOne({username}); // check both email matching (model-email: this fun -email) = email
    if(!user){
        throw new Error(); // if not match email the throw error
    }
    // check password match or not 
    const isMatchPw = await bcrypt.compare(password, user.password); // compare with bycrypt ps
    if(!isMatchPw){
        throw new Error();
    }
    return user; 
}

//generate auth token  // npm i jsonwebtoken
userSchema.methods.generateAuthToken = async function (){
    const _user = this;
    const token = jwt.sign({_id:_user._id.toString()}, process.env.TOKEN_KEY);
   _user.tokens = _user.tokens.concat({token});

   await _user.save(); // save to db
   return token;
}
const User = mongoose.model("User", userSchema);
module.exports = User;