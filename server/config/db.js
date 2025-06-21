const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ngo_management', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MySQL Database Connected Successfully');
    
    // Sync all models
    // Use { force: true } cautiously as it drops existing tables
    // { alter: true } attempts to alter tables without dropping
    await sequelize.sync({ alter: true });
    console.log('All models were synchronized successfully (altered tables)');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

module.exports = { connectDB, sequelize }; 