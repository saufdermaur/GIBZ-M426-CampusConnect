const express = require("express");
const { verifyToken } = require("../middleware/auth");
const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.js");
const defineModuleModel = require("../models/module.js");

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

router.post("/create-module", verifyToken, async (req, res) => {
  const { name, description } = req.body;
  try {
    const newModule = await Module.create({
      Name: name,
      Description: description,
      AccountID: req.account.accountId,
    });
    res
      .status(201)
      .json({ message: "Module created successfully", module: newModule });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/getAll", verifyToken, async (req, res) => {
  try {
    const modules = await Module.findAll({
      where: { AccountID: req.account.accountId },
    });
    res.status(200).json(modules);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const module = await Module.findOne({
      where: { ModuleID: req.params.id, AccountID: req.account.accountId },
    });
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    res.status(200).json(module);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", verifyToken, async (req, res) => {
  const { name, description } = req.body;
  try {
    const module = await Module.findOne({
      where: { ModuleID: req.params.id, AccountID: req.account.accountId },
    });
    if (!module) {
      return res.status(404).json({ message: "Module not found" });
    }
    module.Name = name || module.Name;
    module.Description = description || module.Description;
    await module.save();
    res.status(200).json({ message: "Module updated successfully", module });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const module = await Module.findOne({
      where: { ModuleID: req.params.id, AccountID: req.account.accountId },
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
