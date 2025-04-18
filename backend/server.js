const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const config = require("./config/config.js");

const app = express();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 6790;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    logging: false,
  }
);

module.exports = sequelize;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");

    app.use(cors());
    app.use(express.json());

    const accountRoutes = require("./routes/accounts");
    app.use("/api/account", accountRoutes);

    const moduleRoutes = require("./routes/modules");
    app.use("/api/module", moduleRoutes);

    const examRoutes = require("./routes/exams");
    app.use("/api/exam", examRoutes);

    app.get("/", (req, res) => {
      res.status(200).send("Hello World!");
    });

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
