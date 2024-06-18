const router = require('express').Router();
const {register,login, forgetPassword, confirmVerification, resetPassword}= require('../controllers/auth');

router.post('/signup', register);

router.post('/signin', login);

router.post('/forget-password',forgetPassword);

router.post('/verification',confirmVerification);

router.post('/reset-password/:id',resetPassword);

module.exports = router;
