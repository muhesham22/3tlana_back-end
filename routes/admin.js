const router = require('express').Router();

const adminController = require('../controllers/admin');

const {authing} = require('../utils/authing');


router.post('/add-product', adminController.addproduct);

router.post('/add-technician', adminController.addtech);

router.put('/:productId', adminController.updateproduct);

router.delete('/:productId' , adminController.deleteproduct);

router.delete('/:technicianId', adminController.deletetech);

router.get('/' , adminController.getTech )

module.exports = router;

