const Joi = require('joi');
const { objectId } = require('./custom-validation');

const nearbyHotel = {
	body: Joi.object().keys({
		address: Joi.string().required(),
	}),
};

const addClick = {
	params: Joi.object().keys({
		hotelId: Joi.string().custom(objectId),
	}),
};

const addBookmark = {
	params: Joi.object().keys({
		hotelId: Joi.string().custom(objectId),
	}),
};

module.exports = {
	nearbyHotel,
	addClick,
	addBookmark,
};
