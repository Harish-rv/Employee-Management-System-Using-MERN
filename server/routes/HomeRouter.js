const router = require('express').Router();
const homeController = require('../controllers/user/HomeController');

/**
 * Employee Checkin Page
 */
router.get('/',homeController.checkInPage);
router.get('/check-in',homeController.checkInForm);
router.post('/checkin-process',homeController.checkinProcess);


module.exports = router;