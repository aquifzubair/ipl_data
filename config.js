const path = `${__dirname}/.env`;

require("dotenv").config({ path });

module.exports = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.PORT,
  database: process.env.DB_DATABASE
};