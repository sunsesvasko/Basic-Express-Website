const express = require('express');
const viewController = require('./../controllers/viewController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn,
                viewController.getOverview);

router.get('/about', authController.isLoggedIn, viewController.getAbout);
router.get('/contact', authController.isLoggedIn, viewController.getContact);
router.get('/login', viewController.getLoginForm);
router.get('/register', viewController.getRegisterForm);
router.get('/me', authController.isLoggedIn, viewController.getMe);

router.post('/contact/send', viewController.sendMail);

module.exports = router;