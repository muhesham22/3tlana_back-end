const router = require('express').Router();

const servicecontroller = require('../controllers/service');
const service = require('../models/service');

const { authing } = require('../utils/authing');

router.get('/' ,servicecontroller.viewServices);

router.post('/:serviceId', servicecontroller.bookService);

router.get('/:service' , servicecontroller.viewSingleServices )

router.put('/:serviceId' , servicecontroller.addTechnicianToService)

router.delete('/:serviceId' , servicecontroller.removerService)


module.exports = router;