const mongoose = require('mongoose');

const connectDB =async ()=>{
    await mongoose.connect(process.env.MONGO_URI,{
        useNewParser: true,
        useCreateIndex: true,
        useUnifiedTopology:true,
        useFindAndModify: false
    });

    console.log(`MongoDB Connected`);

}

module.exports = connectDB;