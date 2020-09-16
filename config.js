let path1 = require('path');

path = path1.join(`${__dirname}`, `.env`);
path = path1.normalize(path)


require("dotenv").config({ path });

module.exports = {
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || checkingForHeroku,
  port: process.env.PORT,
};