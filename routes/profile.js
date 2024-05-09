const router = require('express').Router();

const {viewprofile} = require('../controllers/profile');

router.get('/profile', viewprofile);

module.exports = router;

