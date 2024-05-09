const router = require('express').Router();

const adminController = require('../controllers/admin');

router.post('/add-product', adminController.addproduct);

router.put('/:productId', adminController.update);

router.delete('/:productId', adminController.delete);

module.exports = router;

