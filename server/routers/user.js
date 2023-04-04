const express = require("express");
const router = express.Router();
const User = require("../models/user");
const authz = require("../middleware/auth")

// login router
router.post('/user/login', async(req, res) =>{
    try {
     const user = await User.findByCredentail(req.body.username,req.body.password); // call statics methode and pass values
      const token = await user.generateAuthToken();
     if(!user){
         res.status(401).send();
     } 
     res.status(200).send({user, token});
    } catch (error) {
     res.status(404).send(error);
    }
  })

  //logout user-------------------------
  router.post("/users/logout", authz, async(req, res)=>{
      try{
          req.user.tokens = req.user.tokens.filter((token)=>{
              return token.token !== req.token; // return token list without same token
          })
          await req.user.save(); // save to the DB
          res.status(200).send('logouted!');
      }catch(e){
          res.status(500).send()
      }
  })


// register user -------------------------------------
router.post("/users/:name/:email/:username/:password", async(req, res)=> {
    const _name = req.params.name;
    const _email = req.params.email;
    const _username = req.params.username;
    const _password = req.params.password;
    const user = new User({
        name:_name,
        email: _email,
        username : _username,
        password : _password
    });

        try{
            await user.save()
            res.status(201).send(user)
        }catch(e){
            res.status(400).send(e);
        }
});
// get one user from id ------------------
router.get("/users/me",authz, async(req,res)=>{
    const _id = req.user._id;
    try {
        const user = await User.findById(_id);
        if(!user){
           return res.status(404).send();
        }
        return res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
}); // end of get

router.patch("/users/update",authz, async(req,res) =>{
    try {
        const updateuser = await User.findByIdAndUpdate(req.user._id,req.body,{new:true});

        if(!updateuser){
           return res.status(404).send();
        }
        return res.status(200).send(updateuser);
            
    } catch (error) {
        res.status(400).send(error);
    }
});

// delete method
router.delete('/users/delete/me',authz, async(req, res) =>{
    try {
        const deleteUser = await User.findByIdAndDelete(req.user._id);
        if(!deleteUser){
            return res.status(404).send();
        }
        return res.status(200).send('Deleted');
    } catch (error) {
        res.status(400).send(error);
    }
})
module.exports = router;
