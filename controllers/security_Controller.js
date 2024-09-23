const { User } = require("../models");

module.exports = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
           
            const user = await User.findOne({ where: { email } });


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