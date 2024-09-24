const  {User}  = require("../models/User");

module.exports = {
    post: async (req, res, next) => {
        try {
          const user = await User.create(req.body);
          res.status(201).json(user);
        } catch (error) {
          next(error);
        }
      },
        
    };