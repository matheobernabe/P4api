const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = function UserModelGenerator(connection) {
  class User extends Model {}

  User.init(
    {
      id: {
        type: DataTypes.UUID,  // UUID plutôt que STRING pour correspondre à UUIDV4
        unique: true,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 100],  // La longueur minimale et maximale pour le mot de passe
          is: /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9])/,
        },
      },
    },
    {
      sequelize: connection,
      modelName: 'User',  
    }
  );

  // Hash du mot de passe avant la création de l'utilisateur
  User.addHook("beforeCreate", async (user) => {
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
  });

  // Hash du mot de passe avant la mise à jour de l'utilisateur
  User.addHook("beforeUpdate", async (user) => {
    if (user.changed("password")) {
      user.password = await bcrypt.hash(user.password, await bcrypt.genSalt(10));
    }
  });

  return User;
};
