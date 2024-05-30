const express = require('express');
const { verifyToken } = require('../middleware/auth');
const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.js');
const defineExamModel = require('../models/exam.js');

const router = express.Router();

const sequelize = new Sequelize(
  config.test.database,
  config.test.username,
  config.test.password,
  {
    host: config.test.host,
    dialect: config.test.dialect,
    port: config.test.port,
  }
);

const Exam = defineExamModel(sequelize, DataTypes);

router.post('/create-exam', verifyToken, async (req, res) => {
  const { moduleId, grade, weight, examTitle, description, examDate } = req.body;
  try {
    const newExam = await Exam.create({
      ModuleID: moduleId,
      Grade: grade,
      Weight: weight,
      ExamTitle: examTitle,
      Description: description,
      ExamDate: examDate,
    });
    res.status(201).json({ message: 'Exam created successfully', exam: newExam });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/getAll', verifyToken, async (req, res) => {
  try {
    const exams = await Exam.findAll();
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const exam = await Exam.findOne({ where: { ExamID: req.params.id } });
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  const { grade, weight, examTitle, description, examDate } = req.body;
  try {
    const exam = await Exam.findOne({
      where: { ExamID: req.params.id }
    });
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    exam.Grade = grade || exam.Grade;
    exam.Weight = weight || exam.Weight;
    exam.ExamTitle = examTitle || exam.ExamTitle;
    exam.Description = description || exam.Description;
    exam.ExamDate = examDate || exam.ExamDate;
    await exam.save();
    res.status(200).json({ message: 'Exam updated successfully', exam });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const exam = await Exam.findOne({
      where: { ExamID: req.params.id }
    });
    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }
    await exam.destroy();
    res.status(200).json({ message: 'Exam deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
