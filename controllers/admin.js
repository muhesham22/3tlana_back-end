const Product = require('../models/product');
const User = require('../models/user');
const Technician = require('../models/technician');
const technician = require('../models/technician');

exports.addproduct = async (req, res, next) => {
    try {
        const { 
            name,
            description,
            price,
            brand,
            imageurl,
            qty,
            cbrand,
            cmodel,
            cyear
        } = req.body;
        const product = new Product({
            name,
            price,
            description,
            prodbrand: brand,
            image: imageurl,
            qty,
            car: {
                brand:cbrand,
                model:cmodel,
                year:cyear
            }
        })
        await product.save();
        res.status(201).json({ message: 'product added successfully' })
    } catch (error) {
        console.log(error);
        console.log('product could not be added');
    }
};

exports.updateproduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(422).json({ error: 'invalid iput' });
        }
        const { name, price, description, car, brand } = req.body;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'product not found' });
        }
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.car = car || product.car;
        product.brand = brand || product.brand;
        await product.save();
        res.json({ message: 'product updated successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'internal Server Error' });
    }
};

exports.deleteproduct = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(422).json({ error: 'invalid input' });
        }
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: 'product not found' });
        }
        await Product.findByIdAndRemove(productId);
        const user = await User.findById(req.userId);
        const users = await User.find();
        for (const user of users) {
            const remfromcart = user.cart.filter(item => item.product.toString() === productId);
            if (remfromcart.length > 0) {
                user.cart = user.cart.filter(item => item.product.toString() !== productId);
                await user.save();
            }
        }
        await user.save();
        res.json({ message: 'product deleted successfully', product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'internal Server Error' });
    }
};

exports.addtech = async (req,res)=>{
    try {
        const { 
            firstname,
            lastname,
            ssn,
            feild
        } = req.body;
        const technician = new Technician({
            firstname,
            lastname,
            ssn,
            feild
        })
        await technician.save();
        res.status(201).json({ message: 'technician added successfully' })
    } catch (error) {
        console.log(error);
        console.log('technician could not be added');
    }
};

exports.deletetech = async (req, res, next) => {
    try {
        const technicianId = req.params.technicianId;
        if (!technicianId || !mongoose.Types.ObjectId.isValid(technicianId)) {
            return res.status(422).json({ error: 'invalid input' });
        }
        const technician = await Technician.findById(technicianId);
        if (!technician) {
            return res.status(404).json({ error: 'technician not found' });
        }
        await technician.findByIdAndRemove(technicianId);
        res.json({ message: 'technician deleted successfully', technician });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'internal Server Error' });
    }
};




