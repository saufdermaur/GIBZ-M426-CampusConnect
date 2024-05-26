/**
 * @swagger
 * components:
 *   schemas:
 *     Account:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *         - password
 *       properties:
 *         accountID:
 *           type: string
 *           format: uuid
 *           description: The auto-generated ID of the account
 *         firstName:
 *           type: string
 *           description: The first name of the account holder
 *         lastName:
 *           type: string
 *           description: The last name of the account holder
 *         email:
 *           type: string
 *           description: The email of the account holder
 *         passwordHash:
 *           type: string
 *           description: The hashed password of the account holder
 *       example:
 *         accountID: d5fE_asz
 *         firstName: John
 *         lastName: Doe
 *         email: johndoe@example.com
 *         passwordHash: $2b$10$EIX/fp5j5TLm1Vsi58xjXe6/uhH2Boe9M5pEERQ/RqA/ff5fJ6wK6
 */

/**
 * @swagger
 * tags:
 *   name: Accounts
 *   description: The accounts managing API
 */

/**
 * @swagger
 * /api/account/create-account:
 *   post:
 *     summary: Create a new account
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Account'
 *     responses:
 *       201:
 *         description: The account was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/account/login:
 *   post:
 *     summary: Login to an account
 *     tags: [Accounts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 description: The email of the account holder
 *               password:
 *                 type: string
 *                 description: The password of the account holder
 *             example:
 *               email: johndoe@example.com
 *               password: yourpassword
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       404:
 *         description: Account not found
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/account/change-password:
 *   post:
 *     summary: Change password of an account
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oldPassword
 *               - newPassword
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 description: The old password of the account holder
 *               newPassword:
 *                 type: string
 *                 description: The new password of the account holder
 *             example:
 *               oldPassword: oldpassword
 *               newPassword: newpassword
 *     responses:
 *       200:
 *         description: Password successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating successful password change
 *       401:
 *         description: Old password does not match
 *       404:
 *         description: Account not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/account/delete-account:
 *   delete:
 *     summary: Delete an account
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating successful account deletion
 *       404:
 *         description: Account not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/account/account-info:
 *   get:
 *     summary: Get account information
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Account information retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Account'
 *       404:
 *         description: Account not found
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/account/change-email:
 *   post:
 *     summary: Change the email of an account
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newEmail
 *             properties:
 *               newEmail:
 *                 type: string
 *                 description: The new email of the account holder
 *             example:
 *               newEmail: newemail@example.com
 *     responses:
 *       200:
 *         description: Email successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating successful email update
 *       400:
 *         description: Invalid email format
 *       404:
 *         description: Account not found
 *       409:
 *         description: Email already in use
 *       500:
 *         description: Some server error
 */

/**
 * @swagger
 * /api/account/change-first-name:
 *   patch:
 *     summary: Change the first name of an account
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The new first name of the account holder
 *             example:
 *               firstName: NewFirstName
 *     responses:
        200:
            description: First name updated successfully
        404:
            description: Account not found
        500:
            description: Some server error
 */

/**
 * @swagger
 * /api/account/change-last-name:
 *   patch:
 *     summary: Change the last name of an account
 *     tags: [Accounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lastName
 *             properties:
 *               lastName:
 *                 type: string
 *                 description: The new last name of the account holder
 *             example:
 *               lastName: NewLastName
 *     responses:
 *       200:
 *         description: Last name updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A message indicating successful last name update
 *       404:
 *         description: Account not found
 *       500:
 *         description: Some server error
 */
