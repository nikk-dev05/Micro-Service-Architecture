const mongoose = require('mongoose');
const connectDB = async ()=>{
    await mongoose.connect("mongodb://127.0.0.1:27017/user_micro_db").then(()=>{
          console.log("mongoose connected succeessfully");
    }).catch(()=>{
        console.log("mongoose cant connect due to some server error");
    })
}
module.exports = connectDB;