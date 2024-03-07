const router = require('express').Router();
const AdminController = require('../controllers/admin/EmployeeController');

/**
 * Admin Login
 */
function isloggedIn(req,res,next){
    if(req.cookies.adminUser){
        res.redirect('/admin/employeeList');
    }
    next();
}
router.get('/',isloggedIn,AdminController.loginPage);
router.post('/login-process',AdminController.loginAuthenticate,AdminController.loginProcess);

router.get('/:any',(req,res,next)=>{
    if(!req.cookies.adminUser){
        res.redirect('/admin');
    }
    next();
});

/**
 * Employee List
 */
router.get('/employeeList',AdminController.employeeList);
router.get('/employee-addpage',AdminController.addPage);
router.post('/employee-add',AdminController.employeeAdd);
router.get('/employee-editpage/:id',AdminController.editPage);
router.post('/employee-edit',AdminController.employeeEdit);
router.get('/employee-delete/:id',AdminController.employeeDelete);







module.exports = router;