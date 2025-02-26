const passport = require('passport');
const httpStatus = require('http-status');
const ApiError = require('../utils/apiError');

const authAccess = (req, res, next) => {
	passport.authenticate('jwt-access', { session: false }, (err, user, info) => {
		if (err || !user) {
			return next(
				new ApiError(
					httpStatus.status.UNAUTHORIZED,
					info?.message || 'Unauthorized'
				)
			);
		}
		req.user = user;
		next();
	})(req, res, next);
};

const authAdmin = (req, res, next) => {
	passport.authenticate('jwt-access', { session: false }, (err, user, info) => {
		if (err || !user) {
			return next(
				new ApiError(
					httpStatus.status.UNAUTHORIZED,
					info?.message || 'Unauthorized'
				)
			);
		}

		if (user.role !== 'admin') {
			return next(new ApiError(httpStatus.status.FORBIDDEN, 'Access Denied'));
		}
		next();
	})(req, res, next);
};

const authRefresh = (req, res, next) => {
	passport.authenticate(
		'jwt-refresh',
		{ session: false },
		(err, user, info) => {
			if (err || !user) {
				return next(
					new ApiError(
						httpStatus.status.UNAUTHORIZED,
						info.message || 'Unauthorized'
					)
				);
			}
			req.user = user;
			next();
		}
	)(req, res, next);
};

const authEmail = (req, res, next) => {
	passport.authenticate('jwt-email', { session: false }, (err, user, info) => {
		if (err || !user) {
			return res.status(httpStatus.status.UNAUTHORIZED).send(`
                <html>
                    <head>
                        <style>
                            body {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                height: 100vh;
                                font-family: Arial, sans-serif;
                            }
                            .message-container {
                                text-align: center;
                                color: #D9534F; 
                            }
                            h1 {
                                color: #D9534F;
                            }
                            p {
                                color: #333;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="message-container">
                            <h1>Unauthorized</h1>
                            <p>${
															info?.message === 'jwt expired'
																? 'Verification link expired. Please request a new verification email.'
																: 'You do not have access to this page.'
														}</p>
                        </div>
                    </body>
                </html>
            `);
		}
		req.user = user;
		next();
	})(req, res, next);
};

const authResetPassword = (req, res, next) => {
	passport.authenticate(
		'jwt-password',
		{ session: false },
		(err, data, info) => {
			if (err || !data) {
				return res.status(httpStatus.status.UNAUTHORIZED).send(`
                <html>
                    <head>
                        <style>
                            body {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                height: 100vh;
                                font-family: Arial, sans-serif;
                            }
                            .message-container {
                                text-align: center;
                                color: #D9534F; 
                            }
                            h1 {
                                color: #D9534F;
                            }
                            p {
                                color: #333;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="message-container">
                            <h1>Unauthorized</h1>
                            <p>${
															info?.message === 'jwt expired'
																? 'Reset password link expired. Please request a new reset password email.'
																: 'You do not have access to this page.'
														}</p>
                        </div>
                    </body>
                </html>
            `);
			}
			req.user = data.user;
			req.password = data.newPassword;
			next();
		}
	)(req, res, next);
};

module.exports = {
	authAccess,
	authAdmin,
	authRefresh,
	authEmail,
	authResetPassword,
};
