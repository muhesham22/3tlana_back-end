const router = require('express').Router();

const ordercontroller = require('../controllers/order');

const { authing } = require('../utils/authing');

router.post('/check-out', authing, ordercontroller.completeOrder)

module.exports = router;