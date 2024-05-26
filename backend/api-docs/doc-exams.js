/**
 * @swagger
 * components:
 *   schemas:
 *     Exam:
 *       type: object
 *       required:
 *         - moduleId
 *         - examTitle
 *         - examDate
 *       properties:
 *         examId:
 *           type: string
 *           format: uuid
 *           description: The auto-generated ID of the exam
 *         moduleId:
 *           type: string
 *           format: uuid
 *           description: The ID of the module
 *         grade:
 *           type: number
 *           format: float
 *           description: The grade of the exam
 *         weight:
 *           type: number
 *           format: float
 *           description: The weight of the exam
 *         examTitle:
 *           type: string
 *           description: The title of the exam
 *         description:
 *           type: string
 *           description: The description of the exam
 *         examDate:
 *           type: string
 *           format: date
 *           description: The date of the exam
 *       example:
 *         examId: d5fE_asz
 *         moduleId: 1b8eab39-3c4a-4c7b-8e9d-1d5a6f88e0bc
 *         grade: 85.5
 *         weight: 20.0
 *         examTitle: Midterm Exam
 *         description: This is the midterm exam for Module 1
 *         examDate: 2023-05-20
 */

/**
 * @swagger
 * tags:
 *   name: Exams
 *   description: The exams managing API
 */

/**
 * @swagger
 * /api/exam/create-exam:
 *   post:
 *     summary: Create a new exam
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Exam'
 *     responses:
 *       201:
 *         description: The exam was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exam'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/exam/:
 *   get:
 *     summary: Returns the list of all the exams
 *     tags: [Exams]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the exams
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exam'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/exam/{id}:
 *   get:
 *     summary: Get an exam by ID
 *     tags: [Exams]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The exam ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The exam description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exam'
 *       404:
 *         description: The exam was not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/exam/{id}:
 *   put:
 *     summary: Update an exam by ID
 *     tags: [Exams]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The exam ID
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Exam'
 *     responses:
 *       200:
 *         description: The exam was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exam'
 *       404:
 *         description: The exam was not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/exam/{id}:
 *   delete:
 *     summary: Delete an exam by ID
 *     tags: [Exams]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The exam ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The exam was successfully deleted
 *       404:
 *         description: The exam was not found
 *       500:
 *         description: Some server error
 */
