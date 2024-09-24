const { User } = require('../models/db'); 

module.exports = {
  post: async (req, res) => {

    console.log(User);  

    if (!User) {
      res.status(500).json({ error: 'User model is undefined' });
      return;
    }

    try {
      const user = await User.create(req.body);  
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getall: async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};
