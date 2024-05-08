const mongoose=require('mongoose');

async function connectDB(){
    try {
       await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to db")
    } catch (error) {
        console.log("Database is not connected");
    }
}

module.exports= connectDB