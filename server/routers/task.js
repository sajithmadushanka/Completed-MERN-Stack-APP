const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const authz = require('../middleware/auth');

// post method-------------------
router.post('/tasks/:title/:status' , authz,async(req,res)=>{
    const _title = req.params.title;
   const _status = req.params.status;
   const task = new Task({
    title:_title,
    status:_status,
    owner : req.user._id});

    try{
        await task.save();
        res.status(201).send(task);
    }catch(e){
        res.status(400).send(e);
    }
});
// get data -------------------------
router.get("/gettasks", async(req, res)=>{
            try{
                const tasks = await Task.find({});
                res.status(200).send(tasks);
            }catch(e){
                res.status(400).send(e);
            }
})

// ---------- get all task for one user
router.get("/tasks/all/me",authz, async(req,res) =>{  
    // const _id = req.params.id; // this should be owenr id
    const _id = req.user._id;
   try {
    const tasks = await Task.find({owner:_id});
    if(!tasks){
        return res.status(404).send('invalid user')
         
    }
    return res.status(200).send(tasks);
   } catch (error) {
        res.status(400).send(error);
   }
});
//update task
router.patch("/tasks/update/:id",authz, async(req,res) =>{

    // body validation part ---------
    const update = Object.keys(req.body);
    const allowUpdates = ["title", "status", "date"];
    const isValidOperation = update.every((update)=>{
        return allowUpdates.includes(update);
    });
    if(!isValidOperation){
        res.send({Error: "INVALID OPERATION"});
    }
 // if body valided the update task
    try {
        const updateTask = await Task.findByIdAndUpdate(
            req.params.id,
        req.body,{new:true});
        if(!updateTask){
            res.status(404).send('not found');
        }
        return res.status(200).send(updateTask);
    } catch (error) {
        res.status(400).send();
    }
});
// delete task
router.delete("/tasks/delete/:id",authz, async(req,res) =>{
    const deletetask = await Task.findByIdAndDelete({_id: req.params.id,
                //"owner":req.user._id
    });
    try {
        if(!deletetask){
            return res.status(404).send('not found!')
        }
        return res.status(200).send("Deleted!");
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
