const Joi = require('joi');
const { password, objectId } = require('./custom-validation');

const getUserById = {
	params: Joi.object().keys({
		userId: Joi.string().custom(objectId),
	}),
};

const deleteUser = {
	params: Joi.object().keys({
		userId: Joi.string().custom(objectId),
	}),
};

const updateUser = {
	params: Joi.object().keys({
		userId: Joi.string().custom(objectId),
	}),
	body: Joi.object().keys({
		name: Joi.string().optional(),
		email: Joi.string().optional().email(),
	}),
};

const resetPasswordRequest = {
	params: Joi.object().keys({
		userId: Joi.string().custom(objectId),
	}),
	body: Joi.object().keys({
		password: Joi.string().required().custom(password),
	}),
};

module.exports = {
	getUserById,
	deleteUser,
	updateUser,
	resetPasswordRequest,
};
