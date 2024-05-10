const router = require('express').Router();

const cartcontroller = require('../controllers/cart');

router.get('/cart', cartcontroller.view);

router.post('/:productId', cartcontroller.addItem);

router.delete('/:productId',cartcontroller.removeItem);

module.exports = router;
