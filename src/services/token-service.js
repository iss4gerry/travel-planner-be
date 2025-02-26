const jwt = require('jsonwebtoken');
const config = require('../configs/index');
const { tokenType } = require('../configs/token');

const generateAccessToken = (userId, name, role) => {
	const payload = {
		userId: userId,
		name: name,
		role: role,
		type: tokenType.ACCESS,
	};

	return jwt.sign(payload, config.jwt.secret, {
		expiresIn: config.jwt.access.expires,
	});
};

const generateRefreshToken = (userId, name, role) => {
	const payload = {
		userId: userId,
		name: name,
		role: role,
		type: tokenType.REFRESH,
	};

	return jwt.sign(payload, config.jwt.secret, {
		expiresIn: config.jwt.refresh.expires,
	});
};

const generateVerifyEmailToken = (userId, email) => {
	const payload = {
		userId: userId,
		email: email,
		type: tokenType.VERIFY_EMAIL,
	};

	return jwt.sign(payload, config.jwt.secret, {
		expiresIn: config.jwt.verifyEmail.expires,
	});
};

const generateAuthToken = (userId, name) => {
	const accessToken = generateAccessToken(userId, name);
	const refreshToken = generateRefreshToken(userId, name);
	return {
		accessToken,
		refreshToken,
	};
};

const generateResetPasswordToken = (userId, newPassword) => {
	const payload = {
		userId: userId,
		newPassword: newPassword,
		type: tokenType.RESET_PASSWORD,
	};

	return jwt.sign(payload, config.jwt.secret, {
		expiresIn: config.jwt.resetPassword.expires,
	});
};

module.exports = {
	generateAuthToken,
	generateVerifyEmailToken,
	generateResetPasswordToken,
};
