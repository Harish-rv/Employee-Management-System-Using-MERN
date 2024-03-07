const mongoose = require('mongoose');

const employee_checkInSchema = new mongoose.Schema({
    "employee_id":{
        type:String,
        required:true
    },
    "checkin_time":{
        type:Date,
        required:true
    },
    "createAt":{
        type:Date,
        required:true
    }
});

const checkInschema = mongoose.model('employee_checkin',employee_checkInSchema);

module.exports = checkInschema;