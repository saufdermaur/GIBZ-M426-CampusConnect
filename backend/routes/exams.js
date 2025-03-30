const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { DataTypes, Op } = require('sequelize');
const sequelize = require("../server.js");
const defineExamModel = require('../models/exam.js');
const defineModuleModel = require('../models/module.js');
const jwt = require('jsonwebtoken');

const router = express.Router();
const Exam = defineExamModel(sequelize, DataTypes);
const Module = defineModuleModel(sequelize, DataTypes);

router.use(verifyToken); // Applying verifyToken middleware for all routes

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

// Apply decodeJwtMiddleware to all routes after verifyToken
router.use(decodeJwtMiddleware);

// Routes
router.post("/create-exam", async (req, res) => {
  const { ModuleId, Grade, Weight, ExamTitle, Description, ExamDate } = req.body;
  try {
    const newExam = await Exam.create({
      ModuleID: ModuleId,
      Grade: Grade,
      Weight: Weight,
      ExamTitle: ExamTitle,
      Description: Description,
      ExamDate: ExamDate,
    });
    res.status(201).json({ message: "Exam created successfully", exam: newExam });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/getAll", async (req, res) => {
  try {
    const modules = await Module.findAll({ where: { AccountID: req.account.accountId } });

    // Extract module IDs
    const moduleIds = modules.map(module => module.ModuleID);

    // Find all exams associated with these module IDs
    const exams = await Exam.findAll({
      where: { ModuleID: moduleIds }
    });

    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/getExamsThisWeek', async (req, res) => {
  try {
    const modules = await Module.findAll({
      where: { AccountID: req.account.accountId }
    });
    const moduleIds = modules.map(module => module.ModuleID);
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    const exams = await Exam.findAll({
      where: {
        ModuleID: moduleIds,
        ExamDate: {
          [Op.between]: [today, nextWeek]
        }
      }
    });
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/getAverageGrades', async (req, res) => {
  try {
    // Fetch all modules for the given account ID
    const modules = await Module.findAll({
      where: { AccountID: req.account.accountId }
    });

    // Map the modules to get their IDs
    const moduleIds = modules.map(module => module.ModuleID);

    // Fetch all exams with non-null grades for the retrieved modules
    const exams = await Exam.findAll({
      where: {
        ModuleID: moduleIds,
        Grade: { [Op.ne]: null },
        Weight: { [Op.ne]: null } // Assuming Weight is not null
      }
    });

    // Check if there are any exams
    if (exams.length === 0) {
      return res.status(200).json({ message: 'No grades available to calculate average' });
    }

    // Calculate weighted sum of grades
    let weightedSum = 0;
    let totalWeight = 0;

    exams.forEach(exam => {
      weightedSum += exam.Grade * exam.Weight;
      totalWeight += exam.Weight;
    });

    // Calculate the average grade
    const averageGrade = weightedSum / totalWeight;

    // Return the average grade
    res.status(200).json({ averageGrade });
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const exam = await Exam.findOne({ where: { ExamID: req.params.id } });
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { ModuleId, Grade, Weight, ExamTitle, Description, ExamDate } = req.body;
  console.log(ExamDate);
  try {
    const exam = await Exam.findOne({
      where: { ExamID: req.params.id },
    });
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    exam.ModuleID = ModuleId || exam.ModuleID;
    exam.Grade = Grade || exam.Grade;
    exam.Weight = Weight || exam.Weight;
    exam.ExamTitle = ExamTitle || exam.ExamTitle;
    exam.Description = Description || exam.Description;
    exam.ExamDate = ExamDate || exam.ExamDate;
    await exam.save();
    res.status(200).json({ message: "Exam updated successfully", exam });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const exam = await Exam.findOne({
      where: { ExamID: req.params.id },
    });
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    await exam.destroy();
    res.status(200).json({ message: "Exam deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
