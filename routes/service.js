const router = require('express').Router();

const servicecontroller = require('../controllers/service');
const service = require('../models/service');

const { authing } = require('../utils/authing');

router.get('/', authing ,servicecontroller.viewServices);

router.post('/:serviceId', authing, servicecontroller.bookService);


module.exports = router;