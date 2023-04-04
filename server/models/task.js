const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true,
        default : false
    },
    date:{
        type: Date
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        
    }
});

const Task = mongoose.model("Task", taskSchema);
module.exports = Task;