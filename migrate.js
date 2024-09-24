const { sequelize } = require('./Api/models/db');  // Assure-toi d'importer sequelize

// Synchronise tous les modèles avec la base de données
sequelize.sync({ alter: true })  // Utilise sequelize pour synchroniser
  .then(() => {
    console.log("Database synchronized successfully.");
    process.exit();
  })
  .catch((error) => {
    console.error("Error synchronizing the database:", error);
    process.exit(1);
  });
