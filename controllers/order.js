const mongoose = require('mongoose');


const User = require('../models/user');
const Order = require('../models/order');



exports.completeOrder = async (req, res) => {
    const userId = req.userId;
    const { address } = req.body;

    if (!userId) {
        return res.status(404).send({ error: 'User not found' });
    }
    if (!address) {
        return res.status(404).send({ error: 'missing address' })
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }

        if (!user.cart || user.cart.length === 0) {
            return res.status(404).send({ error: 'Cart is empty' });
        }

        const totalPrice = user.cart.reduce((total, item) => {
            const product = item.product;
            const productPrice = product ? product.price : 0;
            return total + item.quantity * productPrice;
        }, 0);

        const order = new Order({
            items: { ...user.cart },
            total: totalPrice,
            user: user._id,
            address
        });

        await order.save();
        user.cart = [];  // Clear the user's cart
        await user.save();

        res.status(201).send({ message: 'Order completed successfully', order });
    } catch (error) {
        res.status(500).send({ error: 'Failed to complete the order' });
    }
};

exports.vieworders = async (req, res) => {
    const userId = req.userId;
    try {

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }
        const orders = await Order.find({ user });
        if (!orders) {
            return res.send({ message: "user has no orders yet" })
        }
    }
    catch (error){
        res.status(500).send({ error: 'Failed to retrieve orders' });
    }
};
