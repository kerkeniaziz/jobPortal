const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error.js");


//import routes
const authRoutes = require ('./routes/authRoutes');


//database connection

mongoose.connect(process.env.DATABASE, {
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
    //useCreateIndex: true,
    //userFindAndModify: false
})
.then(()=>console.log("database connected"))
.catch((err)=>console.log(err));


//Middelware
app.use(morgan('dev'));
app.use(bodyParser.json({limit: "5mb"}));
app.use(bodyParser.urlencoded({limit: "5mb",extended: true}));
app.use(cookieParser());
app.use(cors());


//Routes middelware
//app.get('/', (req,res)=>{
 //   res.send('Hello World');
//})
app.use('/api', authRoutes);



//error middelware
app.use(errorHandler);
//port
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});