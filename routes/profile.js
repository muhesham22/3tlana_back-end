const router = require('express').Router();

const { viewprofile } = require('../controllers/profile');

const { authing } = require('../utils/authing');

router.get('/profile', authing, viewprofile);

module.exports = router;