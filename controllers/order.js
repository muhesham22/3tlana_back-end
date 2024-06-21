const mongoose = require('mongoose');

const Product = require('../models/product');
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
        let items = [];
        let totalPrice = 0;
        for (let item of user.cart) {
            const product = await Product.findById(item.product)
            const productPrice = product.price;
            totalPrice += item.qty * productPrice;
            items.push({ product: product._id, quantity: item.qty, price: productPrice, name: product.name, type: item.type });
        }
        const order = new Order({
            items,
            total: totalPrice,
            user: user._id,
            address
        });
        await order.save();
        user.cart = [];  // Clear the user's cart
        await user.save();

        res.status(201).send({ message: 'Order completed successfully', order });
    } catch (error) {
        console.error(error)
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
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: 'Failed to retrieve orders' });
    }
};