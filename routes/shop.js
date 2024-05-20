const router = require('express').Router();

const shopController = require('../controllers/shop');

router.get('/',shopController.getproducts);

router.get('/:productId',shopController.getOneproduct);

module.exports = router;