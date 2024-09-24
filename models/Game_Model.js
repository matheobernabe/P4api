const { Model, DataTypes } = require('sequelize');

module.exports = function GameModelGenerator(sequelize) {
  class Game extends Model {}

  Game.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      player1Id: {
        type: DataTypes.UUID,  
        allowNull: false,
      },
      player2Id: {
        type: DataTypes.UUID,  
        allowNull: true,  
      },
      status: {
        type: DataTypes.ENUM('pending', 'ongoing', 'finished'),
        defaultValue: 'pending',  
      },
      winnerId: {
        type: DataTypes.UUID,  
        allowNull: true,
      },
      board: {
        type: DataTypes.JSON,  
        defaultValue: [
          [' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' '],
          [' ', ' ', ' ', ' ', ' ', ' ', ' '],
        ],  
        allowNull: false,
      },
      currentPlayerId: {
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
