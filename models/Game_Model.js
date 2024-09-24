const { DataTypes, Model } = require('sequelize');

class Game extends Model {}

module.exports = (sequelize) => {
  Game.init(
    {
      id: {
        type: DataTypes.UUID,
        unique: true,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      player1Id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      player2Id: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      currentPlayerId: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      board: {
        type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.STRING)),
        defaultValue: Array(6).fill(Array(7).fill(' ')),
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: 'waiting',
      },
      winnerId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Game',
    }
  );

  return Game;
};