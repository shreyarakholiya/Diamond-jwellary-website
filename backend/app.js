const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");


const errorMiddleware = require("./middleware/error");

//config
dotenv.config({path:"backend/config/config.env"})

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

//rpute imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);

//middleware for error
app.use(errorMiddleware);

module.exports=app