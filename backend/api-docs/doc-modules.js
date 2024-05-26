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
 *   description: The modules managing API
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
 *     summary: Returns the list of all the modules
 *     tags: [Modules]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the modules
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
 *         description: The module ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The module description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Module'
 *       404:
 *         description: The module was not found
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
 *         description: The module ID
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
 *         description: The module was successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Module'
 *       404:
 *         description: The module was not found
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
 *         description: The module ID
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The module was successfully deleted
 *       404:
 *         description: The module was not found
 *       500:
 *         description: Some server error
 */
