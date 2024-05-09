const router = require('express').Router();

const shopController = require('../controllers/shop');

router.post('/shop',shopController.getproducts);

router.post('/shop/:productid',shopController.getOneproduct);

module.exports = router;