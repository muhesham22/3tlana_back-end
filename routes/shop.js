const router = require('express').Router();

const shopController = require('../controllers/shop');

router.get('/shop',shopController.getproducts);

router.get('/shop/:productId',shopController.getOneproduct);

module.exports = router;