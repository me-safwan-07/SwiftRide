const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        const connect = await mongoose.connect('mongodb://localhost:27017/SwiftRide')
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;