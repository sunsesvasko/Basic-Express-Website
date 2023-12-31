const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.patch('/updateMe', authController.protect,
                          userController.uploadUserPhoto,
                          userController.resizeUserPhoto,
                          userController.updateMe);

// router.use(authController.protect);

router.route('/').get(authController.protect, userController.getAllUsers)
                 .post(userController.createUser);

router.route('/:id').get(userController.getUser)
                    .patch(userController.updateUser)
                    .delete(userController.deleteUser);

module.exports = router;