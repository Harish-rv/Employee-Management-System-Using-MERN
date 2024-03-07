const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/attendance_crm')
    .then(res => console.log('database connected '+res.connection.host))
    .catch(err => console.log(err));
}

module.exports = connectDB;

