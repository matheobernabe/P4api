const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = function UserModelGenerator(connection) {
  class User extends Model {}

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      id: {
        type: DataTypes.STRING,
        unique: true,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: 8,
          is: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/,
        },
      },
    },
    {
      sequelize: connection,
    }
  );

  User.addHook("beforeCreate", async (user) => {
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
  });
  User.addHook("beforeUpdate", async (user) => {
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
    });

  return User;
};
