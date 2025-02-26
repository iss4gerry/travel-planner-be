const express = require('express');
const adsController = require('../controllers/ads-controller');
const upload = require('../utils/multer');
const validate = require('../middlewares/validate');
const adsValidation = require('../validations/ads-validation');
const { authAccess } = require('../middlewares/auth');
const { route } = require('./auth-route');

const router = express.Router();

router
	.route('/banners/upload')
	.post(
		authAccess,
		upload.single('image'),
		validate(adsValidation.uploadBanner),
		adsController.uploadBanner
	);

router
	.route('/banners')
	.get(
		authAccess,
		validate(adsValidation.getAllBanner),
		adsController.getAllBanners
	);

router
	.route('/banners/:bannerId')
	.get(authAccess, adsController.getBannerById)
	.delete(authAccess, adsController.deleteBannerById)
	.patch(
		authAccess,
		upload.single('image'),
		validate(adsValidation.updateBanner),
		adsController.updateBanner
	);

router
	.route('/banners/:bannerId/paid')
	.post(authAccess, adsController.changeBannerPaidStatus);

module.exports = router;

/**
 * @swagger
 * /ads/banners/upload:
 *   post:
 *     summary: Upload new banner advertisement
 *     tags: [Advertisements]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: file
 *                 description: Only JPG or PNG files are allowed
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *               targetUrl:
 *                 type: string
 *               bannerDuration:
 *                 type: number
 *               cost:
 *                 type: float
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Banner uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     imageUrl:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     startDate:
 *                       type: string
 *                     targetUrl:
 *                       type: string
 *                     bannerDuration:
 *                       type: integer
 *                     cost:
 *                       type: float
 *                     location:
 *                       type: string
 *                     validUntil:
 *                       type: string
 *                       format: date-time
 *                     isActive:
 *                       type: boolean
 *                     isPaid:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */
/**
 * @swagger
 * /ads/banner/{bannerId}:
 *   get:
 *     summary: Get banner by ID
 *     tags: [Advertisements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bannerId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the banner
 *     responses:
 *       200:
 *         description: Banner details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     imageUrl:
 *                       type: string
 *                     title:
 *                       type: string
 *                     description:
 *                       type: string
 *                     startDate:
 *                       type: string
 *                     cost:
 *                       type: float
 *                     location:
 *                       type: string
 *                     targetUrl:
 *                       type: string
 *                     bannerDuration:
 *                       type: integer
 *                     validUntil:
 *                       type: string
 *                       format: date-time
 *                     isActive:
 *                       type: boolean
 *                     isPaid:
 *                       type: boolean
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Banner not found
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /ads/banner/{bannerId}:
 *   delete:
 *     summary: Delete banner by ID
 *     tags: [Advertisements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: bannerId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the banner to delete
 *     responses:
 *       200:
 *         description: Banner deleted successfully
 *       404:
 *         description: Banner not found
 *       401:
 *         description: Unauthorized
 */
/**
 * @swagger
 * /ads/banner/{bannerId}:
 *   patch:
 *     summary: Update banner by ID
 *     tags: [Advertisements]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: bannerId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the banner to update
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Only JPG or PNG files are allowed
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *               targetUrl:
 *                 type: string
 *               bannerDuration:
 *                 type: number
 *               cost:
 *                 type: float
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Banner updated successfully
 *       404:
 *         description: Banner not found
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /ads/banners:
 *   get:
 *     summary: Get all banner advertisements with pagination
 *     tags: [Advertisements]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: isPaid
 *         schema:
 *           type: boolean
 *         description: Paid status
 *     responses:
 *       200:
 *         description: List of all banners
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: integer
 *                   example: 200
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       userId:
 *                         type: string
 *                       imageUrl:
 *                         type: string
 *                       title:
 *                         type: string
 *                       description:
 *                         type: string
 *                       startDate:
 *                         type: string
 *                       targetUrl:
 *                         type: string
 *                       bannerDuration:
 *                         type: integer
 *                       cost:
 *                         type: float
 *                       location:
 *                         type: string
 *                       isActive:
 *                         type: boolean
 *                       isPaid:
 *                         type: boolean
 *                     cost:
 *                       type: float
 *                     location:
 *                       type: string
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     totalItems:
 *                       type: integer
 *                     totalPage:
 *                       type: integer
 *                     currentPage:
 *                       type: integer
 *                     pageSize:
 *                       type: integer
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /ads/banner/{bannerId}/paid:
 *   patch:
 *     summary: Change banner paid status
 *     tags: [Advertisements]
 *     security:
 *       - bearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: path
 *         name: bannerId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the banner to update
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Only JPG or PNG files are allowed
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               startDate:
 *                 type: string
 *               targetUrl:
 *                 type: string
 *               bannerDuration:
 *                 type: number
 *               cost:
 *                 type: float
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Banner updated successfully
 *       404:
 *         description: Banner not found
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Bad request
 */
