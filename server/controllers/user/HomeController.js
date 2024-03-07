const bcrypt = require('bcrypt');
const employeeModel = require('../../models/admin/employeeModel');
const checkInModel = require('../../models/admin/checkInModel');

exports.checkInPage = (req,res) => {
    res.render('user/home');
}

exports.checkInForm = async (req,res) => {
    const employeeList = await employeeModel.find();
    res.render('user/checkIn',{employeeList});
}

exports.checkinProcess = async (req,res) => {
    let employee_id = req.body.Employeeid;
    let employee_password = req.body.password;
    let date = Date();

    if(employee_id && employee_password){
        const employee = await employeeModel.findOne({"_id":employee_id});
        
        if(employee){
            const validate = await bcrypt.compare(employee_password,employee.employee_password);
            if(validate){
                let checkInData = {
                    "employee_id": employee_id,
                    "checkin_time": date,
                    "createAt": date
                }

                try {
                    await checkInModel.create(checkInData);
                    const checkIndatas = await checkInModel.find();
                    res.send(checkIndatas);
                } catch (error) {
                    res.send(error);
                }

            }else{
                res.send('invalid');
            }
        }else{
            res.send('Please Select Employee');
        }
    }
    // res.render('user/checkIn',{employeeList});
}