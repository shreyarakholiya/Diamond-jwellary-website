const mongoose = require("mongoose");

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        // useCreateIndex:true
    }).then((data)=>{
        console.log(`mongodb connected to server ${data.connection.host}`);
    })
}

module.exports = connectDatabase

