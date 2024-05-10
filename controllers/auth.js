const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.register = async (req, res, next) => {
    try {
        const {
            name,
            email,
            phone,
            password,
            carModel,
            carbrand,
            carYear,
            carPlateNumber
        } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: 'User already exists' })
        }
        
        const hashedpass = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            email,
            phone,
            password: hashedpass,
            car: {
                model: carModel,
                brand:carbrand,
                year: carYear,
                platenumber:carPlateNumber
            }
        })
        await user.save();
       return res.status(201).json({ message: 'user created successfully' })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' })
    }
}

exports.login = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            res.status(404).json({ error: 'user not found' })
        }
        const isvalid = await bcrypt.compare(password, user.password);
        if (!isvalid) {
            res.status(401).json({ error: 'password invalid' });
        }
        const token = jwt.sign({ userid: user._id.toString() }, 'superprivatekey', { expiresIn: '48h' })
        res.status(200).json({
            message: 'user logged in successfully',
            token,
            user: {
                name: user.name,
                email: user.email,
                id: user._id,
                phone:user.phone,
                carModel:user.car.model,
                carBrand:user.car.brand,
                carYear:user.car.year,
                carPN:user.car.platenumber

            }
        })
    } catch (error) {
        res.status(500).json({ error: 'internal server error' })
    }
};