const router = require('express').Router();

const adminController = require('../controllers/admin');

router.post('/add-product', adminController.addproduct);

router.post('/add-technician', adminController.addtech);

router.put('/:productId', adminController.updateproduct);

router.delete('/:productId', adminController.deleteproduct);

router.delete('/:technicianId', adminController.deletetech);

module.exports = router;

