const router = require('express').Router();
const {register,login, profile}= require('../controllers/auth');

router.post('/signup', register);

router.post('/signin', login);

router.get('/profile/:token', profile)


module.exports = router;
