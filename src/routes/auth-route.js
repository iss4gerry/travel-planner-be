const express = require('express');
const authController = require('../controllers/auth-controller');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth-validation');
const { authEmail, authAccess, authRefresh } = require('../middlewares/auth');

const router = express.Router();

router
	.route('/register')
	.post(validate(authValidation.register), authController.register);
router
	.route('/login')
	.post(validate(authValidation.login), authController.login);

router.route('/token/refresh').get(authRefresh, authController.refreshToken);

router
	.route('/verification/email/send')
	.post(authAccess, authController.sendEmailVerification);
router
	.route('/verification/email/confirm')
	.get(authEmail, authController.verifyEmail);

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Register:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: The name of user
 *         email:
 *           type: string
 *           description: The email of user
 *         password:
 *           type: string
 *           description: The password of user
 *     Login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of user
 *         password:
 *           type: string
 *           description: The password of user
 *
 */

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Auth management API
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Register'
 *     responses:
 *       '200':
 *         description: User Created
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Success"
 *               data:
 *                 user:
 *                   id: "103ecbc8-ad46-4668-9f51-12bcef159bb3"
 *                   name: "dummy"
 *                   email: "dummy@gmail.com"
 *                   password: "$2a$08$0jMq80ot9Y6e5r.2udXVY.Sj46TvVoJI/wyiGfpqr8s378uCVymL."
 *                   role: "admin"
 *                   createdAt: "2024-02-03T13:55:35.124Z"
 *                   updatedAt: "2024-02-03T13:55:35.124Z"
 *                   isEmailVerified: false
 *               tokens:
 *                 access:
 *                   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDNlY2JjOC1hZDQ2LTQ2NjgtOWY1MS0xMmJjZWYxNTliYjMiLCJpYXQiOjE3MDY5Njg1MzYsImV4CI6MTcwNjk3MDMzNiwidHlwZSI6ImFjY2VzcyJ9.xMktH0n7aPXtRA0Xzw4OwgmGk8hpXzKYBy-1i1ht6_M"
 *                   expires: "2024-02-03T14:25:36.243Z"
 *                 refresh:
 *                   token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDNlY2JjOC1hZDQ2LTQ2NjgtOWY1MS0xMmJjZWYxNTliYjMiLCJpYXQiOjE3MDY5Njg1MzYsImV4CI6MTcwOTU2MDUzNiwidHlwZSI6InJlZnJlc2gifQ.8W1zMo_dziHVD8ge-T00Bcxbw42nWzj_6tOpV-lKcrM"
 *                   expires: "2024-03-04T13:55:36.246Z"
 *       '400':
 *         description: Email already taken
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: "Email already taken"
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
 * /auth/login:
 *   post:
 *     summary: Login from existing user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       '200':
 *         description: User Login
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Success"
 *               data:
 *                 user:
 *                   id: "103ecbc8-ad46-4668-9f51-12bcef159bb3"
 *                   name: "dummy"
 *                   email: "dummy@gmail.com"
 *                   password: "$2a$08$0jMq80ot9Y6e5r.2udXVY.Sj46TvVoJI/wyiGfpqr8s378uCVymL."
 *                   role: "admin"
 *                   createdAt: "2024-02-03T13:55:35.124Z"
 *                   updatedAt: "2024-02-03T13:55:35.124Z"
 *                   isEmailVerified: false
 *               tokens:
 *                 access:
 *                   token: "eyJhbGciO...."
 *                   expires: "2024-02-03T14:26:02.049Z"
 *                 refresh:
 *                   token: "eyJhbGciOi....."
 *                   expires: "2024-03-04T13:56:02.049Z"
 *       '400':
 *         description: Email or Password required
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: "\"email\" is required, \"password\" is required"
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
 * /auth/refresh:
 *   get:
 *     summary: Refresh access token
 *     tags: [Auth]
 *     description: This endpoint refreshes the access token using a valid refresh token provided in the Authorization header.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Success"
 *               tokens:
 *                 access:
 *                   token: "eyJhbGciOiJI...."
 *                 refresh:
 *                   token: "eyJhbGciOiJIUzI1Ni...."
 *       '400':
 *         description: Invalid or expired refresh token
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: "Invalid or expired refresh token"
 *       '401':
 *         description: Unauthorized (Missing or invalid token)
 *         content:
 *           application/json:
 *             example:
 *               status: 401
 *               message: "Unauthorized"
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
 * /auth/verification/email/send:
 *   post:
 *     summary: Send email verification link
 *     tags: [Auth]
 *     description: This endpoint sends a verification link to the user's email. The user needs to check their email and click the link to verify their account.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Verification email sent
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Verification email sent"
 *       '401':
 *         description: Unauthorized (Invalid or missing access token)
 *         content:
 *           application/json:
 *             example:
 *               status: 401
 *               message: "Unauthorized"
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
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */
