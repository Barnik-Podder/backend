require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected');
        // const fetchdata = await mongoose.connection.db.collection("login_data").find({}).toArray();
        // console.log(fetchdata);
    } catch(error) {
        console.error(error.message);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
