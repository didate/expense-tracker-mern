const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL, { user: process.env.MONGO_USER, pass: process.env.MONGO_USER_PASS, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
        console.log(`MongoDB connected : ${conn.connection.host}`.cyan.underline.bold);
    } catch (error) {
        console.log(`Error : ${error.message}`.red.bold);
        process.exit(1);
    }
}

module.exports = connectDB;