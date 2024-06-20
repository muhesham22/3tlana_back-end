const Order = require('../models/order');
const Service = require('../models/service');
const Technician = require('../models/technician');
const User = require('../models/user');



exports.viewServices = async (req, res) => {
    try {
        const services = await Service.find().populate('technicians');
        res.status(200).json({ message: 'service retruned', services })
    } catch (error) {
        return res.status(500).json({ error: 'internal server error' })
    }
};

exports.bookService = async (req, res) => {
    const userId = req.body.userId;
    const serviceId = req.body.serviceId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).send({ error: 'Service not found' });
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

exports.viewSingleServices = async (req, res, next) => {
    const serviceName = req.params.service;
    try {
        const service = await Service.findOne({ name: serviceName }).populate('technicians');
        if (!service) {
            // If no service found, return a 404 error
            return res.status(404).send({ error: 'Service not found' });
        }
        // If service found, return the service data
        return res.status(200).json({ message: 'Service found', service });
    } catch (error) {
        // If there's an internal server error (e.g., database error)
        console.error('Error in viewSingleServices:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
};


 exports.addTechnicianToService = async (req , res , next ) => {
    const serviceId = req.params.serviceId;
    const technicianId = req.body.technicianId;
    try {
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).send({ error: 'Service not found' });
        }
        const technician = await Technician.findById(technicianId);
        if (!technician) {
            return res.status(404).send({ error: 'Technician not found' });
        }
        service.technicians.push(technician);
        await service.save();
        res.json({ message: 'Technician added to service', service });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'internal Server Error' });
    }
 }


 exports.removerService = async (req , res , next) => {
    const serviceId = req.params.serviceId;
    try {
        await Service.deleteOne({_id:serviceId})
        res.json({message:'service deleted'})
    } catch (error) {
        res.json({error})
    }
 }