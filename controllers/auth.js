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
            confirmPassword,
            carModel,
            carYear,
        } = req.body;
        console.log(
            name,
            email,
            phone,
            password,
            confirmPassword,
            carModel,
            carYear,
        )
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ error: 'User already exists' })
        }
        if(password !== confirmPassword){
            return res.json({message:"password does not match confirm-password"})
        }
        const hashedpass = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            email,
            phone,
            password: hashedpass,
            car: {
                model: carModel,
                brand:'unkown',
                year: carYear,
                platenumber:"unknown"
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
        const token = jwt.sign({ userid: user._id }, 'superprivatekey', { expiresIn: '48h' })
        res.status(200).json({
            message: 'user logged in successfully',
            token,
            user: {
                name: user.name,
                email: user.email,
                id: user._id
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'internal server error' })
    }
}