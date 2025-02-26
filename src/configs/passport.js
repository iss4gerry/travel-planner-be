const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const config = require('../configs/index');
const { tokenType } = require('../configs/token');
const prisma = require('../../prisma');

const jwtOption = {
	secretOrKey: config.jwt.secret,
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const emailOption = {
	secretOrKey: config.jwt.secret,
	jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token'),
};

const verifyAccessToken = async (payload, done) => {
	try {
		if (payload.type !== tokenType.ACCESS) {
			return done(null, false, { message: 'Invalid token type' });
		}

		const user = await prisma.user.findFirst({
			where: {
				id: payload.userId,
			},
		});

		if (!user) {
			return done(null, false, { message: 'User not found' });
		}

		done(null, user);
	} catch (error) {
		done(error, false);
	}
};

const verifyRefreshToken = async (payload, done) => {
	try {
		if (payload.type !== tokenType.REFRESH) {
			return done(null, false, { message: 'Invalid token type' });
		}

		const user = await prisma.user.findFirst({
			where: {
				id: payload.userId,
			},
		});

		if (!user) {
			return done(null, false, { message: 'User not found' });
		}

		done(null, user);
	} catch (error) {
		done(error, false);
	}
};

const verifyEmailToken = async (payload, done) => {
	try {
		if (payload.type !== tokenType.VERIFY_EMAIL) {
			return done(null, false, { message: 'Invalid token type' });
		}

		const user = await prisma.user.findFirst({
			where: {
				id: payload.userId,
			},
		});

		if (!user) {
			return done(null, false, { message: 'User not found' });
		}

		done(null, user);
	} catch (error) {
		done(error, false);
	}
};

const verifyResetPasswordToken = async (payload, done) => {
	try {
		if (payload.type !== tokenType.RESET_PASSWORD) {
			return done(null, false, { message: 'Invalid token type' });
		}

		const user = await prisma.user.findFirst({
			where: {
				id: payload.userId,
			},
		});

		if (!user) {
			return done(null, false, { message: 'User not found' });
		}

		done(null, { user, newPassword: payload.newPassword });
	} catch (error) {
		done(error, false);
	}
};

const accessStrategy = new JwtStrategy(jwtOption, verifyAccessToken);
const refreshStrategy = new JwtStrategy(jwtOption, verifyRefreshToken);
const emailStrategy = new JwtStrategy(emailOption, verifyEmailToken);
const passwordStrategy = new JwtStrategy(emailOption, verifyResetPasswordToken);

module.exports = {
	accessStrategy,
	refreshStrategy,
	emailStrategy,
	passwordStrategy,
};
