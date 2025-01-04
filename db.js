const mongoose = require('mongoose');
require('dotenv').config()

const connectToDB = ()=>{
    mongoose.connect(`mongodb+srv://${process.env.MONGO_NAME}:${process.env.MONGO_PASSWORD}@job.a1cqn.mongodb.net/?retryWrites=true&w=majority&appName=job`)
    .then(() => console.log('connected to mongodb successfully'))
    .catch(()=>console.log('error in connecting mongodb'))
}

module.exports = connectToDB