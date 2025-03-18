import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "../env";

dotenv.config();

const sequelize = new Sequelize({
  dialect: "mssql", // Use 'mssql' for Azure SQL
  host: DB_HOST, // Database host
  port: DB_PORT, // Database port
  database: DB_NAME, // Database name
  username: DB_USER, // Database username
  password: DB_PASSWORD, // Database password
  dialectOptions: {
    options: {
      encrypt: true, // Required for Azure SQL
      trustServerCertificate: false, // Required for Azure SQL
    },
  },
  models: [__dirname + "/../models/**/*.{js,ts}"], // Dynamically load models
});

export default sequelize;
