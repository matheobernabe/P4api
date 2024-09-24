const { sequelize } = require('./models/db');  


sequelize.sync({ alter: true })  
  .then(() => {
    console.log("Database synchronized successfully.");
    process.exit();
  })
  .catch((error) => {
    console.error("Error synchronizing the database:", error);
    process.exit(1);
  });
