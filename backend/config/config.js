import dotenv from "dotenv";
import { Sequelize } from "sequelize";

dotenv.config();

// const dbConfig_online = {
//   database: process.env.DB_NAME ,
//   username: process.env.DB_USER ,
//   password: process.env.DB_PASSWORD ,
//   host: process.env.DB_HOST ,
//   port: process.env.DB_PORT ,
//   dialect: 'postgres',
//   logging: false,
//   dialectOptions: {
//     ssl: {
//       require: true, // Ensure SSL is required
//       rejectUnauthorized: false, // This can be adjusted based on your SSL configuration
//     },
//   },
// };

const dbConfig_online = {
  database: 'blogapp' ,
  username:'postgres' ,
  password: '123',
  host:'localhost' ,
  port: '5432' ,
  dialect: 'postgres',
  logging: false,
  dialectOptions: {
    ssl: {
      require: true, // Ensure SSL is required
      rejectUnauthorized: false, // This can be adjusted based on your SSL configuration
    },
  },
};
 const dbConfig_offline = {
  database: 'blogapp',
  username: 'postgres',
  password: '123',
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  logging: false, // Set to true to see SQL queries in the console
};


export const sequelize = new Sequelize(
  dbConfig_online.database,
  dbConfig_online.username,
  dbConfig_online.password,
  {
    host: dbConfig_online.host,
    port: dbConfig_online.port,
    dialect: dbConfig_online.dialect,
    logging: dbConfig_online.logging,
    // dialectOptions: dbConfig_online.dialectOptions,
  }
);

