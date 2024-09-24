require('dotenv').config(); 

const Sequelize = require('sequelize');
const UserModelGenerator = require('./User_Model');
const GameModelGenerator = require('./Game_Model');

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL bug ici');
}

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

const Game = GameModelGenerator(sequelize);
const User = UserModelGenerator(sequelize);

module.exports = { sequelize, User };