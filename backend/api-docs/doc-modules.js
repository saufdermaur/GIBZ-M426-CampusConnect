/**
 * @swagger
 * components:
 *   schemas:
 *     Module:
 *       type: object
 *       required:
 *         - name
 *         - accountId
 *       properties:
 *         moduleId:
 *           type: string
 *           format: uuid
 *           description: The auto-generated ID of the module
 *         name:
 *           type: string
 *           description: The name of the module
 *         description:
 *           type: string
 *           description: The description of the module
 *         accountId:
 *           type: string
 *           format: uuid
 *           description: The ID of the account
 *       example:
 *         moduleId: d5fE_asz
 *         name: Module 1
 *         description: Description of Module 1
 *         accountId: 1b8eab39-3c4a-4c7b-8e9d-1d5a6f88e0bc
 */

/**
 * @swagger
 * tags:
 *   name: Modules
 *   description: APIs for managing modules
 */

/**
 * @swagger
 * /api/module/create-module:
 *   post:
 *     summary: Create a new module
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Module'
 *     responses:
 *       201:
 *         description: The module was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Module'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/module/getAll:
 *   get:
 *     summary: Get all modules associated with the authenticated account
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of modules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Module'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/module/{id}:
 *   get:
 *     summary: Get a module by ID
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Module ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Module details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Module'
 *       404:
 *         description: Module not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/module/{id}:
 *   put:
 *     summary: Update a module by ID
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Module ID
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Module'
 *     responses:
 *       200:
 *         description: Module updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Module'
 *       404:
 *         description: Module not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/module/{id}:
 *   delete:
 *     summary: Delete a module by ID
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: Module ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Module deleted successfully
 *       404:
 *         description: Module not found
 *       500:
 *         description: Some server error
 */
