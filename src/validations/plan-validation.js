const Joi = require('joi');
const { objectId } = require('./custom-validation');

const planById = {
	params: Joi.object().keys({
		planId: Joi.string().custom(objectId),
	}),
};

const dayId = {
	params: Joi.object().keys({
		dayId: Joi.string().custom(objectId),
	}),
};

const createPlan = {
	body: Joi.object().keys({
		name: Joi.string().required(),
		startDate: Joi.string().required(),
		endDate: Joi.string().required(),
		travelCompanion: Joi.string().required(),
		budget: Joi.number().required(),
		travelTheme: Joi.string().required(),
	}),
};

const addActivity = {
	params: Joi.object().keys({
		dayId: Joi.string().custom(objectId),
	}),
	body: Joi.object().keys({
		name: Joi.string().required(),
		location: Joi.string().required(),
		cost: Joi.number().required(),
		description: Joi.string().required(),
	}),
};

const deleteActivity = {
	params: Joi.object().keys({
		activityId: Joi.string().custom(objectId),
	}),
};

const deleteHotelFromPlan = {
	params: Joi.object().keys({
		hotelPlanId: Joi.string().custom(objectId),
	}),
};

const addHotelToPlan = {
	params: Joi.object().keys({
		dayId: Joi.string().custom(objectId),
	}),
	body: Joi.object().keys({
		hotelDetailId: Joi.string().custom(objectId),
	}),
};
module.exports = {
	createPlan,
	addActivity,
	addHotelToPlan,
	deleteActivity,
	deleteHotelFromPlan,
	planById,
	dayId,
};
