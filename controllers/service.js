const Service = require('../models/service');
const User = require('../models/user');

exports.bookService = async(req,res)=>{
    const userId = req.userId;
    const serviceId = req.params.serviceId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        const service = await Service.findById(serviceId);
        const serviceInst = service.serviceInstance.populate('user');

    }
    catch(error){

    }
};