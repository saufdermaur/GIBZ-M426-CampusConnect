const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { Sequelize, DataTypes, Op } = require('sequelize');
const config = require('../config/config.js');
const defineExamModel = require('../models/exam.js');
const defineModuleModel = require('../models/module.js');

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

const Exam = defineExamModel(sequelize, DataTypes);
const Module = defineModuleModel(sequelize, DataTypes);

router.post("/create-exam", verifyToken, async (req, res) => {
  const { moduleId, grade, weight, examTitle, description, examDate } =
    req.body;
  try {
    const newExam = await Exam.create({
      ModuleID: moduleId,
      Grade: grade,
      Weight: weight,
      ExamTitle: examTitle,
      Description: description,
      ExamDate: examDate,
    });
    res
      .status(201)
      .json({ message: "Exam created successfully", exam: newExam });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/getAll", verifyToken, async (req, res) => {
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

router.get('/getExamsThisWeek', verifyToken, async (req, res) => {
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

router.get('/getAverageGrades', verifyToken, async (req, res) => {
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

router.get('/:id', verifyToken, async (req, res) => {
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

router.put("/:id", verifyToken, async (req, res) => {
  const { grade, weight, examTitle, description, examDate } = req.body;
  try {
    const exam = await Exam.findOne({
      where: { ExamID: req.params.id },
    });
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    exam.Grade = grade || exam.Grade;
    exam.Weight = weight || exam.Weight;
    exam.ExamTitle = examTitle || exam.ExamTitle;
    exam.Description = description || exam.Description;
    exam.ExamDate = examDate || exam.ExamDate;
    await exam.save();
    res.status(200).json({ message: "Exam updated successfully", exam });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", verifyToken, async (req, res) => {
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
