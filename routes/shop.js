const router = require('express').Router();

const shopController = require('../controllers/shop');

router.get('/shop',shopController.getproducts);

router.get('/shop/:productid',shopController.getOneproduct);

module.exports = router;