const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
//-----
const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");

require("./DB/mongodb");

//create express app
const app = express();
app.use(cors());
app.use(bodyparser.json());

//use router to app
app.use(userRouter);
app.use(taskRouter);

// create port
const port = 4000;
app.listen(port,()=>{console.log('server is running!')});

// uri ="mongodb+srv://Mash:123@cluster0.ltngzf3.mongodb.net/todoDB?retryWrites=true&w=majority"
// mongoose.connect(uri,{
//     useNewUrlParser:true,
//     useUnifiedTopology:true,
// });
// mongoose.connection.once("open",()=> {console.log("connected!")});