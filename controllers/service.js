const Order = require('../models/order');
const Service = require('../models/service');
const Technician = require('../models/technician');
const User = require('../models/user');



exports.viewServices = async (req, res) => {
    try {
        const services = Service.find().populate('technicians');
        res.status(200).json({ message: 'service retruned', services })
    } catch (error) {
        return res.status(500).json({ error: 'internal server error' })
    }
};

exports.bookService = async (req, res) => {
    const userId = req.userId;
    const serviceId = req.params.serviceId;
    let { technicianId } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).send({ error: 'Service not found' });
        }
        if (!technicianId) {
            technicianId = service.technicians[Math.floor(Math.random() * (service.technicians.length - 1))]
        }
        let technician = await Technician.findById(technicianId);
        if (!technician) {
            return res.status(404).send({ error: 'technician not found' });
        }
        const order = new Order({
            type: 'service',
            service: service._id,
            user: user._id,
        })
        await order.save();
        res.json({ message: 'service booked successfully', order });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'internal Server Error' });
    }
};