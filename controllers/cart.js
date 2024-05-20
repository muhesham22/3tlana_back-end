const mongoose = require('mongoose');

const User = require('../models/user');
const Product = require('../models/product');

exports.view = async (req, res) => {
    const userId = req.userId;
    try {
        const user = await User.findById(userId).populate('cart.product');
        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }
        const totalPrice = user.cart.reduce((total, item) => {
            const product = item.product;
            const productPrice = product ? product.price : 0;
            return total + item.quantity * productPrice;
        }, 0);
        res.status(200).json({ message: 'cart returned', cart: user.cart, totalPrice: totalPrice });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'internal Server Error' });
    }
};

exports.addItem = async (req, res) => {
    const productId = req.params.productId;
    if (!req.body.qty) {
        req.body.qty = 1;
    }
    const qty = req.body.qty;
    const userId = req.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }
        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(422).json({ error: 'invalid input' });
        }
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'product not found' });
        }
        const existingCartItem = user.cart.find(item => item.product.toString() === productId);
        if (existingCartItem) {
            existingCartItem.qty += qty;
        } else {
            user.cart.push({ product: productId, qty });
        }
        await user.save();
        res.status(201).json({ message: 'product added to cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'internal Server Error' });
    }
};

exports.removeItem = async (req, res) => {
    const productId = req.params.productId;
    const userId = req.userId;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'user not found' });
        }
        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(422).json({ error: 'invalid input' });
        }
        const cartItemIndex = user.cart.findIndex(item => item.product.toString() === productId);
        if (cartItemIndex === -1) {
            return res.status(404).json({ error: 'can not find product in cart' });
        }
        user.cart.splice(cartItemIndex, 1);
        await user.save();
        res.status(200).json({ message: 'item remoed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
