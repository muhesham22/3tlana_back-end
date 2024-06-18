const router = require('express').Router();

const adminController = require('../controllers/admin');

const {authing} = require('../utils/authing');

router.post('/add-service', adminController.addService);

router.post('/add-product', adminController.addproduct);

router.post('/add-technician', adminController.addtech);


router.put('/:productId', adminController.updateproduct);

router.delete('/:productId' , adminController.deleteproduct);

router.delete('/:technicianId', adminController.deletetech);

router.delete('/:serviceId', adminController.deleteservice);

module.exports = router;

