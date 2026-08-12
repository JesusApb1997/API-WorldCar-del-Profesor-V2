import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import AccountModel from './accounts.model.js';
import ProductModel from './product.model.js';
import ProductTypeModel from './producType.model.js';
import BrandModel from './brand.model.js';
import ClientsModel from './clients.model.js';


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
const Product = ProductModel(sequelize, Sequelize);
const ProductType = ProductTypeModel(sequelize, Sequelize);
const Brand = BrandModel(sequelize, Sequelize);
const Clients = ClientsModel(sequelize, Sequelize);

// Define associations

// Account.belongsTo(Role, { foreignKey: 'roleId' });

/* sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database & tables updated/synced!');
  }); */

export { Account, sequelize, Product, ProductType, Brand, Clients };