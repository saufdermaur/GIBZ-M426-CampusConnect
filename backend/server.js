const express = require("express");
//const swaggerUi = require("swagger-ui-express");
//const swaggerSpec = require("./swaggerConfig");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const config = require("./config/config.js");

const app = express();

//app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 6790;

const sequelize = new Sequelize(
  config.dev.database,
  config.dev.username,
  config.dev.password,
  {
    host: config.dev.host,
    dialect: config.dev.dialect,
    port: config.dev.port,
    logging: false,
  }
);

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
