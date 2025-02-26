const Joi = require('joi');
const { objectId } = require('./custom-validation');

const uploadBanner = {
	body: Joi.object().keys({
		title: Joi.string().required(),
		description: Joi.string().required(),
		startDate: Joi.string().required(),
		targetUrl: Joi.string().required(),
		bannerDuration: Joi.any().required(),
		cost: Joi.any().required(),
		location: Joi.string().required(),
	}),
};

const updateBanner = {
	params: Joi.object().keys({
		bannerId: Joi.string().custom(objectId),
	}),
	body: Joi.object().keys({
		title: Joi.string().optional(),
		description: Joi.string().optional(),
		startDate: Joi.string().optional(),
		targetUrl: Joi.string().optional(),
	}),
};

const getAllBanner = {
	query: Joi.object().keys({
		page: Joi.number().optional(),
		limit: Joi.number().optional(),
		isPaid: Joi.boolean().optional(),
	}),
};

module.exports = {
	uploadBanner,
	updateBanner,
	getAllBanner,
};
