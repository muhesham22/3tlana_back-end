const router = require('express').Router();

const cartcontroller = require('../controllers/cart');

const { authing } = require('../utils/authing');

router.get('/', authing, cartcontroller.view);

router.post('/:productId', authing, cartcontroller.addItem);

router.delete('/:productId', authing, cartcontroller.removeItem);

module.exports = router;
