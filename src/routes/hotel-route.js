const express = require('express');
const hotelController = require('../controllers/hotel-controller');
const validate = require('../middlewares/validate');
const hotelValidation = require('../validations/hotel-validation');
const { authAccess } = require('../middlewares/auth');

const router = express.Router();

router.route('/search').get(hotelController.searchHotel);
router.route('/').get(hotelController.getAllHotel);
router
	.route('/recommendation')
	.get(authAccess, hotelController.topRecommendation);
router
	.route('/recommendation/top/:number')
	.get(authAccess, hotelController.topRecommendation);

router
	.route('/nearby')
	.get(
		authAccess,
		validate(hotelValidation.nearbyHotel),
		hotelController.nearbyHotel
	);

router
	.route('/:hotelId/clicks')
	.post(
		authAccess,
		validate(hotelValidation.addClick),
		hotelController.addClick
	);

router
	.route('/:hotelId/bookmarks')
	.post(
		authAccess,
		validate(hotelValidation.addBookmark),
		hotelController.addBookmark
	)
	.delete(
		authAccess,
		validate(hotelValidation.addBookmark),
		hotelController.deleteBookmark
	);

router.route('/clicks').get(authAccess, hotelController.getClick);
router.route('/bookmarks').get(authAccess, hotelController.getBookmark);
router.route('/:hotelId').get(hotelController.getHotel);

module.exports = router;

/**
 * @swagger
 * /hotels:
 *   get:
 *     summary: Get all hotels
 *     tags: [Hotels]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of all hotels
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Success"
 *               data:
 *                 - id: "05ab3029-29cb-432b-a530-ac8d3d07b0cf"
 *                   hotelId: "550e8400-e29b-41d4-a716-446655440000"
 *                   imageUrl: "https://example.com/new-image.jpg"
 *                   name: "New Hotel Detail Example"
 *                   address: "456 New Example Avenue, Example City"
 *                   cost: 150
 *                   description: string
 *                 - id: "6590d41a-f083-4fd9-8183-f4a1cfac5ad3"
 *                   hotelId: "650e8400-e29b-41d4-a716-446655440000"
 *                   imageUrl: "https://example.com/new-image.jpg"
 *                   name: "New Hotel Detail Example"
 *                   address: "456 New Example Avenue, Example City"
 *                   cost: 150
 *                   description: string
 */

/**
 * @swagger
 * /hotels/{hotelId}:
 *   get:
 *     summary: Get Hotel by id
 *     tags: [Hotels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         required: true
 *         description: The ID of the hotel
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Get Hotel by id
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Success"
 *               data:
 *                 - id: "6590d41a-f083-4fd9-8183-f4a1cfac5ad3"
 *                   hotelId: "650e8400-e29b-41d4-a716-446655440000"
 *                   imageUrl: "https://example.com/new-image.jpg"
 *                   name: "New Hotel Detail Example"
 *                   address: "456 New Example Avenue, Example City"
 *                   cost: 150
 *                   description: string
 */

/**
 * @swagger
 * /hotels/{hotelId}/bookmarks:
 *   post:
 *     summary: Add a hotel to bookmarks
 *     tags: [Hotels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         required: true
 *         description: The ID of the hotel
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Hotel added to bookmarks
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Success"
 *               data:
 *                 id: "632efff9-ed98-4c2e-baff-63955c13fbaf"
 *                 userId: "a3f9ded5-2377-4509-9034-317d8c9189b2"
 *                 hotelId: "650e8400-e29b-41d4-a716-446655440000"
 *                 bookmarkedAt: "2024-12-07T07:24:48.798Z"
 *   delete:
 *     summary: Remove a hotel from bookmarks
 *     tags: [Hotels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         required: true
 *         description: The ID of the hotel
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Hotel removed from bookmarks
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Success"
 *               data:
 *                 id: "b13de927-ced1-4e80-923a-d6358fe697e4"
 *                 userId: "a3f9ded5-2377-4509-9034-317d8c9189b2"
 *                 hotelId: "650e8400-e29b-41d4-a716-446655440000"
 *                 bookmarkedAt: "2024-12-07T06:48:28.521Z"
 */

/**
 * @swagger
 * /hotels/{hotelId}/clicks:
 *   post:
 *     summary: Register a click on a hotel
 *     tags: [Hotels]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: hotelId
 *         required: true
 *         description: The ID of the hotel
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Click registered
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Success"
 *               data:
 *                 id: "632efff9-ed98-4c2e-baff-63955c13fbaf"
 *                 userId: "a3f9ded5-2377-4509-9034-317d8c9189b2"
 *                 hotelId: "650e8400-e29b-41d4-a716-446655440000"
 *                 clickedAt: "2024-12-07T07:24:48.798Z"
 */

/**
 * @swagger
 * /hotels/clicks:
 *   get:
 *     summary: Get all clicks for the logged-in user
 *     tags: [Hotels]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of clicks
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Success"
 *               data:
 *                 - id: "568666e8-b852-4956-89fa-8615c6c2836a"
 *                   userId: "a3f9ded5-2377-4509-9034-317d8c9189b2"
 *                   hotelId: "550e8400-e29b-41d4-a716-446655440000"
 *                   clickedAt: "2024-12-07T04:45:22.213Z"
 *                 - id: "2b307845-62bf-4bf5-8ea5-604633e1248c"
 *                   userId: "a3f9ded5-2377-4509-9034-317d8c9189b2"
 *                   hotelId: "650e8400-e29b-41d4-a716-446655440000"
 *                   clickedAt: "2024-12-07T04:45:39.204Z"
 */

/**
 * @swagger
 * /hotels/bookmarks:
 *   get:
 *     summary: Get all bookmarks for the logged-in user
 *     tags: [Hotels]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of bookmarked hotels
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Success"
 *               data:
 *                 - id: "783653ff-a7fb-4a8a-8ee3-a6e68c35cbb9"
 *                   userId: "a3f9ded5-2377-4509-9034-317d8c9189b2"
 *                   hotelId: "550e8400-e29b-41d4-a716-446655440000"
 *                   bookmarkedAt: "2024-12-07T04:45:30.330Z"
 *                 - id: "632efff9-ed98-4c2e-baff-63955c13fbaf"
 *                   userId: "a3f9ded5-2377-4509-9034-317d8c9189b2"
 *                   hotelId: "650e8400-e29b-41d4-a716-446655440000"
 *                   bookmarkedAt: "2024-12-07T07:24:48.798Z"
 */

/**
 * @swagger
 * /hotels/recommendation:
 *   get:
 *     summary: Get Hotel Recommendation
 *     tags: [Hotels]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: List of Hotel Recommendation
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: "Success"
 *               data:
 *                 - id: "05ab3029-29cb-432b-a530-ac8d3d07b0cf"
 *                   hotelId: "550e8400-e29b-41d4-a716-446655440000"
 *                   imageUrl: "https://example.com/new-image.jpg"
 *                   name: "New Hotel Detail Example"
 *                   address: "456 New Example Avenue, Example City"
 *                   cost: 150
 *                   description: string
 *                 - id: "6590d41a-f083-4fd9-8183-f4a1cfac5ad3"
 *                   hotelId: "650e8400-e29b-41d4-a716-446655440000"
 *                   imageUrl: "https://example.com/new-image.jpg"
 *                   name: "New Hotel Detail Example"
 *                   address: "456 New Example Avenue, Example City"
 *                   cost: 150
 *                   description: string
 */
