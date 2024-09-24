const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models/db");

module.exports = {
  login: async (req, res, next) => {
    const { username, password } = req.body;

    const user = await User.findOne({
      where: {
        username: username,
      },
    });
    if (!user) return res.sendStatus(401);

    if (!(await bcrypt.compare(password, user.password)))
    return res.sendStatus(401);

    const token = jwt.sign(
      {
        userID: user.id,
      },
      process.env.JWT_SECRET,
      {}
    );
    res.json({ token });
  },
};
