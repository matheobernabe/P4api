const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Game = sequelize.define('Game', {
  grid: {
    type: DataTypes.JSON,
    defaultValue: [
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
      ['', '', '', '', '', '', ''],
    ],
  },
  status: {
    type: DataTypes.ENUM('in_progress', 'completed', 'draw'),
    defaultValue: 'in_progress',
  },
  player1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  player2: {
    type: DataTypes.STRING,
  },
  winner: {
    type: DataTypes.STRING,
  },
});

module.exports = Game;
