const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    employee_name:{
        type:String,
        required:true
    },
    employee_role:{
        type:String,
        required:true
    },
    employee_password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date
    },
    UpdatedAt:{
        type:Date
    }
});

const employeeModel = mongoose.model('employee',employeeSchema);
module.exports = employeeModel; 