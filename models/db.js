const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});


// Authentification de la connexion
sequelize.authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Unable to connect to the database:', err));

module.exports = sequelize;
