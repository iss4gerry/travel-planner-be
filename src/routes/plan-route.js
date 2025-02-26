const express = require('express');
const planController = require('../controllers/plan-controller');
const validate = require('../middlewares/validate');
const planValidation = require('../validations/plan-validation');
const { authAccess } = require('../middlewares/auth');

const router = express.Router();

router.route('/').get(authAccess, planController.getPlan);

router
	.route('/create')
	.post(
		authAccess,
		validate(planValidation.createPlan),
		planController.createPlan
	);

router
	.route('/:planId')
	.get(
		authAccess,
		validate(planValidation.planById),
		planController.getPlanById
	)
	.delete(
		authAccess,
		validate(planValidation.planById),
		planController.deletePlan
	);

router
	.route('/detail/:dayId')
	.get(
		authAccess,
		validate(planValidation.dayId),
		planController.getPlanDetail
	);

router
	.route('/detail/:dayId/activity')
	.post(
		authAccess,
		validate(planValidation.addActivity),
		planController.addActivity
	);

router
	.route('/detail/:dayId/hotel')
	.post(
		authAccess,
		validate(planValidation.addHotelToPlan),
		planController.addHotelToPlan
	);

router
	.route('/activity/:activityId')
	.delete(
		authAccess,
		validate(planValidation.deleteActivity),
		planController.deleteActivity
	);

router
	.route('/hotel/:hotelPlanId')
	.delete(
		authAccess,
		validate(planValidation.deleteHotelFromPlan),
		planController.deleteHotelFromPlan
	);

router.route('/bot').post(authAccess, planController.sendMessageToBot);
router
	.route('/:planId/itinerary')
	.post(authAccess, planController.generateItinerary);

module.exports = router;

/**
 * @swagger
 * /plans/create:
 *   post:
 *     summary: Create a new plan
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Plan skalakasming
 *               startDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-04T17:00:00.000Z"
 *               endDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-07T17:00:00.000Z"
 *             required:
 *               - name
 *               - startDate
 *               - endDate
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: Success
 *               data:
 *                 id: "1e222fd9-50a9-4f5a-8ebd-b00d721ab41e"
 *                 name: Plan skalakasming
 *                 startDate: "2024-12-04T17:00:00.000Z"
 *                 endDate: "2024-12-07T17:00:00.000Z"
 *                 createdAt: "2024-12-07T07:46:27.899Z"
 *                 updatedAt: "2024-12-07T07:46:27.899Z"
 *                 userId: "a3f9ded5-2377-4509-9034-317d8c9189b2"
 *       "400":
 *         description: Validation Error
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: Invalid request payload
 *
 * /plans/{planId}:
 *   get:
 *     summary: Get plan by ID
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         schema:
 *           type: string
 *           example: "e57a8b72-08d6-470a-b666-ed8f57ac7475"
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: Success
 *               data:
 *                 id: "e57a8b72-08d6-470a-b666-ed8f57ac7475"
 *                 name: Plan skalakasming
 *                 startDate: "2024-12-04T17:00:00.000Z"
 *                 endDate: "2024-12-07T17:00:00.000Z"
 *                 createdAt: "2024-12-07T06:40:10.501Z"
 *                 updatedAt: "2024-12-07T06:40:10.501Z"
 *                 userId: "a3f9ded5-2377-4509-9034-317d8c9189b2"
 *                 planDetails:
 *                   - id: "104eb529-9fef-4e76-a2be-9faa7679d18a"
 *                     day: 1
 *                     date: "2024-12-04T17:00:00.000Z"
 *                     activities:
 *                       - id: "a9878c6c-9470-443f-bd2e-0115d664b177"
 *                         name: Kesenian
 *                         description: bali fest
 *                         location: Jl Bali No 788
 *                         cost: 200000
 *                     hotel:
 *                       - id: "ab3ca2de-062e-4798-ac04-5ab4e29cf068"
 *                         hotelDetailId: "05ab3029-29cb-432b-a530-ac8d3d07b0cf"
 *       "404":
 *         description: Not Found
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: Plan not found
 */

/**
 * @swagger
 * /plans:
 *   get:
 *     summary: Get all plans
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: Success
 *               data:
 *                 - id: "27998816-7aad-41d2-b41e-8646020a8d47"
 *                   name: Plan skalakasming
 *                   startDate: "2024-12-04T17:00:00.000Z"
 *                   endDate: "2024-12-07T17:00:00.000Z"
 *                   createdAt: "2024-12-07T06:27:21.662Z"
 *                   updatedAt: "2024-12-07T06:27:21.662Z"
 *                   userId: "a3f9ded5-2377-4509-9034-317d8c9189b2"
 *                 - id: "e57a8b72-08d6-470a-b666-ed8f57ac7475"
 *                   name: Plan skalakasming
 *                   startDate: "2024-12-04T17:00:00.000Z"
 *                   endDate: "2024-12-07T17:00:00.000Z"
 *                   createdAt: "2024-12-07T06:40:10.501Z"
 *                   updatedAt: "2024-12-07T06:40:10.501Z"
 *                   userId: "a3f9ded5-2377-4509-9034-317d8c9189b2"
 *       "404":
 *         description: No plans found
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: No plans found
 */
/**
 * @swagger
 * /plans/{planId}:
 *   delete:
 *     summary: Delete a plan by ID
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         schema:
 *           type: string
 *           example: "e57a8b72-08d6-470a-b666-ed8f57ac7475"
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: Success
 *               data:
 *                 id: "e57a8b72-08d6-470a-b666-ed8f57ac7475"
 *                 name: Plan skalakasming
 *                 startDate: "2024-12-04T17:00:00.000Z"
 *                 endDate: "2024-12-07T17:00:00.000Z"
 *                 createdAt: "2024-12-07T06:40:10.501Z"
 *                 updatedAt: "2024-12-07T06:40:10.501Z"
 *                 userId: "a3f9ded5-2377-4509-9034-317d8c9189b2"
 *       "404":
 *         description: Plan not found
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: Plan not found
 */
/**
 * @swagger
 * /plans/detail/{dayId}:
 *   get:
 *     summary: Get plan detail by day ID
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dayId
 *         required: true
 *         schema:
 *           type: string
 *           example: "3363925e-1b78-49f2-8711-23aa311e51a4"
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: Success
 *               data:
 *                 id: "3363925e-1b78-49f2-8711-23aa311e51a4"
 *                 day: 1
 *                 date: "2024-12-04T17:00:00.000Z"
 *                 planId: "27998816-7aad-41d2-b41e-8646020a8d47"
 *                 activities:
 *                   - id: "a9878c6c-9470-443f-bd2e-0115d664b177"
 *                     name: Kesenian
 *                     description: bali fest
 *                     location: Jl Bali No 788
 *                     cost: 200000
 *                     createdAt: "2024-12-07T06:32:57.275Z"
 *                     updatedAt: "2024-12-07T06:32:57.275Z"
 *                     planDetailId: "3363925e-1b78-49f2-8711-23aa311e51a4"
 *                 hotel:
 *                   - id: "ab3ca2de-062e-4798-ac04-5ab4e29cf068"
 *                     hotelDetailId: "05ab3029-29cb-432b-a530-ac8d3d07b0cf"
 *                     createdAt: "2024-12-07T06:37:45.846Z"
 *                     updatedAt: "2024-12-07T06:37:45.846Z"
 *                     planDetailId: "3363925e-1b78-49f2-8711-23aa311e51a4"
 *       "404":
 *         description: Plan detail not found
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: Plan detail not found
 */
/**
 * @swagger
 * /plans/detail/{dayId}/activity:
 *   post:
 *     summary: Add a new activity to a plan detail by dayId
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dayId
 *         required: true
 *         schema:
 *           type: string
 *           example: "3363925e-1b78-49f2-8711-23aa311e51a4"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Kesenian
 *               description:
 *                 type: string
 *                 example: bali fest
 *               location:
 *                 type: string
 *                 example: Jl Bali No 788
 *               cost:
 *                 type: number
 *                 example: 200000
 *             required:
 *               - name
 *               - description
 *               - location
 *               - cost
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: Success
 *               data:
 *                 id: "baec0abc-7892-47b8-9368-89876ae447bd"
 *                 name: Kesenian
 *                 description: bali fest
 *                 location: Jl Bali No 788
 *                 cost: 200000
 *                 createdAt: "2024-12-07T07:50:11.943Z"
 *                 updatedAt: "2024-12-07T07:50:11.943Z"
 *                 planDetailId: "104eb529-9fef-4e76-a2be-9faa7679d18a"
 */
/**
 * @swagger
 * /plans/detail/{dayId}/hotel:
 *   post:
 *     summary: Add a new hotel to a plan detail by dayId
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: dayId
 *         required: true
 *         schema:
 *           type: string
 *           example: "3363925e-1b78-49f2-8711-23aa311e51a4"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hotelDetailId:
 *                 type: string
 *                 example: "05ab3029-29cb-432b-a530-ac8d3d07b0cf"
 *             required:
 *               - hotelDetailId
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: Success
 *               data:
 *                 id: "37c05767-e4ca-4a01-84c5-fa3fde67dfac"
 *                 hotelDetailId: "05ab3029-29cb-432b-a530-ac8d3d07b0cf"
 *                 createdAt: "2024-12-07T07:50:48.138Z"
 *                 updatedAt: "2024-12-07T07:50:48.138Z"
 *                 planDetailId: "104eb529-9fef-4e76-a2be-9faa7679d18a"
 */
/**
 * @swagger
 * /plans/activity/{activityId}:
 *   delete:
 *     summary: Delete an activity by activityId
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: activityId
 *         required: true
 *         schema:
 *           type: string
 *           example: "a9878c6c-9470-443f-bd2e-0115d664b177"
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: Success
 *               data:
 *                 id: "a9878c6c-9470-443f-bd2e-0115d664b177"
 *                 name: Kesenian
 *                 description: bali fest
 *                 location: Jl Bali No 788
 *                 cost: 200000
 *                 createdAt: "2024-12-07T06:32:57.275Z"
 *                 updatedAt: "2024-12-07T06:32:57.275Z"
 *                 planDetailId: "3363925e-1b78-49f2-8711-23aa311e51a4"
 *       "404":
 *         description: Activity not found
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: Activity not found
 */
/**
 * @swagger
 * /plans/hotel/{hotelPlanId}:
 *   delete:
 *     summary: Delete a hotel plan by hotelPlanId
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: hotelPlanId
 *         required: true
 *         schema:
 *           type: string
 *           example: "37c05767-e4ca-4a01-84c5-fa3fde67dfac"
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: Success
 *               data:
 *                 id: "37c05767-e4ca-4a01-84c5-fa3fde67dfac"
 *                 hotelDetailId: "05ab3029-29cb-432b-a530-ac8d3d07b0cf"
 *                 createdAt: "2024-12-07T07:50:48.138Z"
 *                 updatedAt: "2024-12-07T07:50:48.138Z"
 *                 planDetailId: "104eb529-9fef-4e76-a2be-9faa7679d18a"
 *       "404":
 *         description: Hotel plan not found
 *         content:
 *           application/json:
 *             example:
 *               status: 404
 *               message: Hotel plan not found
 */

/**
 * @swagger
 * /plans/itinerary:
 *   post:
 *     summary: Get Itinerary based on prompt
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *                 example: Give me activity idea
 *             required:
 *               - prompt
 *     responses:
 *       "200":
 *         description: Success
 *         content:
 *           application/json:
 *             example:
 *               status: 200
 *               message: Success
 *               data:
 *                 response: string
 *       "400":
 *         description: Validation Error
 *         content:
 *           application/json:
 *             example:
 *               status: 400
 *               message: Invalid request payload
 */
