const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const employeeModel = require('../../models/admin/employeeModel');
/**
 * Admin Login
 */
exports.loginPage = (req,res) => {
    res.render('admin/login');
}

exports.loginAuthenticate = async (req,res,next)=>{
    const userName = req.body.name;
    const userPassword = req.body.password;
    const getEmployee = await employeeModel.findOne({"employee_name":{'$regex': `^${userName}$`, $options: 'i'}});
    if(getEmployee){
        const employee_id = getEmployee._id;
        const validatePassword = await bcrypt.compare(userPassword,getEmployee.employee_password);
        
        
        if(employee_id && validatePassword){
            const jwtToken = jwt.sign({employee_id},process.env.JWT_TOKEN,{
                expiresIn: '1d'
            });

            if(jwtToken){
                res.cookie('adminUser',jwtToken,{
                    expires: new Date(
                        Date.now()+1*24*60*60*1000
                    ),
                    httpOnly : true
                });
                if(req.cookies.adminUser && jwtToken){
                    const decoded = jwt.verify(req.cookies.adminUser,process.env.JWT_TOKEN);
                    req.employee_id = decoded.employee_id;
                    next();
                }
                next();
            }
        }else{
            res.send('not validated');
        }
    }else{
        res.send('not validated'); 
    }

    
    // res.send();
    // const jwtToken = jwt.sign({})
    // console.log(req.body);
    // const jwtToken = jwt.sign()
    // next();
}

exports.loginProcess = (req,res) => {
    res.redirect('employeeList');
}

/**
 *Employee List
 */
exports.employeeList = async (req,res) => {
    var adminUser = req.cookies.adminUser;
    try {
        const employeeList = await employeeModel.find();
        res.render('admin/employeeList/view',{employeeList,adminUser});
    } catch (error) {
        console.log(error);
    }
}

exports.addPage = (req,res) => {
    var adminUser = req.cookies.adminUser;
    res.render('admin/employeeList/add',{adminUser});
}

exports.employeeAdd = async(req,res) => {
    const hashPassword = await bcrypt.hash(req.body.EmployeePassword,10);
    var date = Date();
    const employee = {
        "employee_name":req.body.EmployeeName,
        "employee_role":req.body.EmployeeRole,
        "employee_password":hashPassword,
        "createdAt":date
    }

    try{
        const addprocess = await employeeModel.create(employee);
        console.log(addprocess);
        res.redirect('employeeList');
    }catch(err){
        console.log(err);
        res.send(err);
    }
}

exports.editPage = async (req,res) => {
    var id = req.params.id;
    try {
        const employee = await employeeModel.findById({"_id":id});
        res.render('admin/employeeList/edit',{employee});
    } catch (error) {
        console.log(error);
    }
}

exports.employeeEdit = async(req,res) => {
    var id = req.body.id;
    var date = Date();
    try {
        const employee = {
            "employee_name":req.body.EmployeeName,
            "employee_role":req.body.EmployeeRole,
            "employee_password":req.body.EmployeePassword,
            "updatedAt":date
        }

        await employeeModel.updateOne({"_id":id},employee);
        res.redirect('employeeList');
    } catch (error) {
        console.log(error);
    }
}

exports.employeeDelete = async(req,res)=>{
    var id = req.params.id;
    try {
        await employeeModel.deleteOne({"_id":id});
        res.redirect('/admin/employeeList');
    } catch (error) {
        console.log(error);
    }
}
