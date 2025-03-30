require("dotenv").config();

module.exports = {
  username: process.env.TEST_DB_USER,
  password: process.env.TEST_DB_PASS,
  database: process.env.TEST_DB_NAME,
  host: process.env.TEST_DB_HOST,
  port: process.env.TEST_DB_PORT,
  dialect: "postgres",
};
