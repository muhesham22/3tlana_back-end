const User = require('../models/user.js');

exports.viewprofile = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'user not found' });
        }
        res.json({ message: 'user information retreived', user });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'internal server error' });
    }
};