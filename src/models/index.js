import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import AccountModel from './accounts.model.js';


dotenv.config();
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres', // <-- Set dialect to 'postgres'
    port: process.env.DB_PORT || 5432, // Optional: set port for PostgreSQL
    logging: true, // Optional: disable SQL logging
  }
);
const Account = AccountModel(sequelize, Sequelize);
// Define associations

// Account.belongsTo(Role, { foreignKey: 'roleId' });

/* sequelize.sync()
  .then(() => {
    console.log('Database & tables created!');
  });

 */
export { Account, sequelize};