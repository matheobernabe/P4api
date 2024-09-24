const { User } = require("../models/User_Model");

module.exports = {
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
           
            const user = await User.findOne({ where: { username } });


            if (!user || !(await user.comparePassword(password))) {
                return res.status(400).json({ error: 'Invalid email or password' });
            }
            const token = user.generateToken();
            res.json({ message: 'Logged in successfully', token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },

};