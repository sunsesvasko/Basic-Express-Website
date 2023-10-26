const express = require('express');
const viewController = require('./../controllers/viewController');

const router = express.Router();

router.get('/', viewController.getOverview);

router.get('/about', viewController.getAbout);
router.get('/contact', viewController.getContact);
router.get('/login', viewController.getLoginForm);
router.get('/register', viewController.getRegisterForm);

router.post('/contact/send', viewController.sendMail);

module.exports = router;