const router = require('express').Router();

const servicecontroller = require('../controllers/service');

const { authing } = require('../utils/authing');


router.post('/', authing, servicecontroller.bookService);


module.exports = router;