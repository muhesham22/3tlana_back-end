const router = require('express').Router();

const shopController = require('../controllers/shop');

router.post('/shop',shopController.getproducts);

router.post('/shop',shopController.getOneproduct);



module.exports = router;