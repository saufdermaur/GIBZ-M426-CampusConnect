const express = require("express");
const { verifyToken } = require("../middleware/auth");
const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.js");
const defineModuleModel = require("../models/module.js");
const jwt = require('jsonwebtoken');

const router = express.Router();
const sequelize = new Sequelize(
  config.dev.database,
  config.dev.username,
  config.dev.password,
  {
    host: config.dev.host,
    dialect: config.dev.dialect,
    port: config.dev.port,
  }
);

const Module = defineModuleModel(sequelize, DataTypes);

// Middleware to decode JWT and set accountId in request
const decodeJwtMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.decode(token);
    req.accountId = decodedToken.accountId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or missing token' });
  }
};

router.use(verifyToken); // Applying verifyToken middleware for all routes

// Apply decodeJwtMiddleware to all routes after verifyToken
router.use(decodeJwtMiddleware);

// Routes
router.post("/create-module", async (req, res) => {
  const { Name, Description } = req.body; // Updated to use uppercase initial letters
  console.log("Name:", Name);
  console.log("Description:", Description);
  try {
    const newModule = await Module.create({
      Name,
      Description,
      AccountID: req.accountId,
    });

    res.status(201).json({ message: "Module created successfully", module: newModule });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const modules = await Module.findAll({
      where: { AccountID: req.accountId },
    });
    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const module = await Module.findOne({
      where: { ModuleID: req.params.id, AccountID: req.accountId },
    });
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    res.status(200).json(module);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { Name, Description } = req.body; // Updated to use uppercase initial letters
  try {
    const module = await Module.findOne({
      where: { ModuleID: req.params.id, AccountID: req.accountId },
    });
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    module.Name = Name || module.Name;
    module.Description = Description || module.Description;
    await module.save();
    res.status(200).json({ message: "Module updated successfully", module });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const module = await Module.findOne({
      where: { ModuleID: req.params.id, AccountID: req.accountId },
    });
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    await module.destroy();
    res.status(200).json({ message: "Module deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
