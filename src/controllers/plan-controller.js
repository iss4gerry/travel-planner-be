const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const planService = require('../services/plan-service');

const createPlan = catchAsync(async (req, res) => {
	const result = await planService.createPlan(req.body, req.user.id);

	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'Success',
		data: result,
	});
});

const getPlan = catchAsync(async (req, res) => {
	const result = await planService.getPlan(req.user.id);

	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'Success',
		data: result,
	});
});

const getPlanById = catchAsync(async (req, res) => {
	const result = await planService.getPlanById(req.params.planId);

	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'Success',
		data: result,
	});
});

const getPlanDetail = catchAsync(async (req, res) => {
	const result = await planService.getPlanDetail(req.params.dayId);

	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'Success',
		data: result,
	});
});

const deletePlan = catchAsync(async (req, res) => {
	const result = await planService.deletePlan(req.params.planId);

	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'Success',
		data: result,
	});
});

const addActivity = catchAsync(async (req, res) => {
	const result = await planService.addActivity(req.params.dayId, req.body);

	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'Success',
		data: result,
	});
});

const deleteActivity = catchAsync(async (req, res) => {
	const result = await planService.deleteActivity(req.params.activityId);

	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'Success',
		data: result,
	});
});

const addHotelToPlan = catchAsync(async (req, res) => {
	const result = await planService.addHotelToPlan(req.params.dayId, req.body);

	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'Success',
		data: result,
	});
});

const deleteHotelFromPlan = catchAsync(async (req, res) => {
	const result = await planService.deleteHotelFromPlan(req.params.hotelPlanId);

	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'Success',
		data: result,
	});
});

const sendMessageToBot = catchAsync(async (req, res) => {
	const result = await planService.sendMessageToBot(req.body.prompt);

	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'Success',
		data: result,
	});
});

const generateItinerary = catchAsync(async (req, res) => {
	const result = await planService.generateItinerary(req.params.planId);

	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'Success',
		data: result,
	});
});

module.exports = {
	createPlan,
	getPlan,
	getPlanById,
	deletePlan,
	addActivity,
	getPlanDetail,
	deleteActivity,
	addHotelToPlan,
	deleteHotelFromPlan,
	sendMessageToBot,
	generateItinerary,
};
