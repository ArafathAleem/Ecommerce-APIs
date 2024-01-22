// import mongoose
const mongoose = require('mongoose');

// mongoDB url stored in env variable
const MONGODB_URL = process.env.MONGODB_URL;

// connect to database
exports.connectMonggose = () => {
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(
        // if database connected
        () => console.log('Database is connected successfully')
    )
    .catch((error) => {
        // if there is some error
        console.log('Database connection failed');
        console.log(error);
    })
}
