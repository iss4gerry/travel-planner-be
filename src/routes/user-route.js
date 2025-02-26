const express = require('express');
const { authResetPassword, authAccess } = require('../middlewares/auth');
const userController = require('../controllers/user-controller');
const {
	getUserById,
	updateUser,
	deleteUser,
	resetPasswordRequest,
} = require('../validations/user-validation');
const validate = require('../middlewares/validate');
const upload = require('../utils/multer');

const router = express.Router();

router.route('/activity').get(authAccess, userController.userActivity);

router
	.route('/:userId')
	.get(authAccess, validate(getUserById), userController.getUser)
	.patch(authAccess, validate(updateUser), userController.updateUser)
	.delete(authAccess, validate(deleteUser), userController.deleteUser);

router
	.route('/:userId/reset-password/request')
	.post(
		authAccess,
		validate(resetPasswordRequest),
		userController.requestResetPassword
	);

router
	.route('/profile/picture')
	.post(
		authAccess,
		upload.single('image'),
		userController.changeProfilePicture
	);

router
	.route('/reset-password/confirm')
	.get(authResetPassword, userController.resetPassword);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Update User:
 *       type: object
 *       optional:
 *         - name
 *         - email
 *       properties:
 *         name:
 *           type: string
 *           description: The name of user
 *         email:
 *           type: string
 *           description: The email of user
 */

/**
 * @swagger
 * /user/{userId}:
 *   get:
 *     summary: Get user by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       '200':
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Success"
 *               data:
 *                 id: "550e8400-e29b-41d4-a716-446655440000"
 *                 name: "mayuyu"
 *                 email: "gerryparuru12@gmail.com"
 *                 password: "$2b$09$gR9n59rE85ZCacPkvXvsR.gokLcGPwvbwih3SnvWbFkGm9PHYqwoS"
 *                 role: "admin"
 *                 createdAt: "1997-07-17T09:20:30.000Z"
 *                 updatedAt: "2024-11-14T16:46:50.371Z"
 *                 isEmailVerified: true
 *       '401':
 *         description: Unauthorized (Invalid or missing access token)
 *         content:
 *           application/json:
 *             example:
 *               status: 401
 *               message: "Unauthorized"
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: "User not found"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: "Internal server error"
 *
 *   patch:
 *     summary: Update user by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the user (optional)
 *               email:
 *                 type: string
 *                 description: The email of the user (optional)
 *             example:
 *               name: "newName"
 *               email: "newemail@example.com"
 *     responses:
 *       '200':
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Success"
 *               data:
 *                 id: "550e8400-e29b-41d4-a716-446655440000"
 *                 name: "mayuyu"
 *                 email: "gerryparuru12@gmail.com"
 *                 password: "$2b$09$gR9n59rE85ZCacPkvXvsR.gokLcGPwvbwih3SnvWbFkGm9PHYqwoS"
 *                 role: "admin"
 *                 createdAt: "1997-07-17T09:20:30.000Z"
 *                 updatedAt: "2024-11-14T16:46:50.371Z"
 *                 isEmailVerified: true
 *       '401':
 *         description: Unauthorized (Invalid or missing access token)
 *         content:
 *           application/json:
 *             example:
 *               status: 401
 *               message: "Unauthorized"
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: "User not found"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: "Internal server error"
 *
 *   delete:
 *     summary: Delete user by ID
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Success"
 *               data:
 *                 id: "550e8400-e29b-41d4-a716-446655440000"
 *                 name: "mayuyu"
 *                 email: "gerryparuru12@gmail.com"
 *                 password: "$2b$09$gR9n59rE85ZCacPkvXvsR.gokLcGPwvbwih3SnvWbFkGm9PHYqwoS"
 *                 role: "admin"
 *                 createdAt: "1997-07-17T09:20:30.000Z"
 *                 updatedAt: "2024-11-14T16:46:50.371Z"
 *                 isEmailVerified: true
 *       '401':
 *         description: Unauthorized (Invalid or missing access token)
 *         content:
 *           application/json:
 *             example:
 *               status: 401
 *               message: "Unauthorized"
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: "User not found"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: "Internal server error"
 */

/**
 * @swagger
 * /user/{userId}/reset-password/request:
 *   post:
 *     summary: Request password reset for user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - password
 *             properties:
 *               password:
 *                 type: string
 *                 description: The new password for the user
 *     responses:
 *       '200':
 *         description: Password reset request successful
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Password reset link sent"
 *       '401':
 *         description: Unauthorized (Invalid or missing access token)
 *         content:
 *           application/json:
 *             example:
 *               status: 401
 *               message: "Unauthorized"
 *       '404':
 *         description: User not found
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: "User not found"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: 500
 *               message: "Internal server error"
 */
