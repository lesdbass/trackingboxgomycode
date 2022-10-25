const { trace } = require("console");
const mongoose=require("mongoose");

require("dotenv").config();
const connectDB = async() => {
    try {

        await mongoose.connect(process.env.Mongo_URI)
        console.log("Databse Connected ...")        
    } catch (error) {
        console.log(`Database failed to connect error ${error}`)
        
    }
}

module.exports = connectDB;