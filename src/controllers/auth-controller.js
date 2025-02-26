const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const authService = require('../services/auth-service');
const tokenService = require('../services/token-service');
const { generateAuthToken } = require('../services/token-service');

const register = catchAsync(async (req, res) => {
	const result = await authService.register(req.body);

	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'Success',
		data: result,
	});
});

const login = catchAsync(async (req, res) => {
	const result = await authService.login(req.body);
	const { accessToken, refreshToken } = tokenService.generateAuthToken(
		result.id,
		result.name
	);

	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'Success',
		data: result,
		tokens: {
			access: accessToken,
			refresh: refreshToken,
		},
	});
});

const sendEmailVerification = catchAsync(async (req, res) => {
	await authService.sendEmailVerification(req.user.id, req.user.email);
	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'Verification email sent',
	});
});

const verifyEmail = catchAsync(async (req, res) => {
	const result = await authService.verifyEmail(req.user.email);
	res.status(httpStatus.status.OK).send(`
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
                }
                h1 {
                    color: #4CAF50;
                }
                p {
                    color: #333;
                }
            </style>
        </head>
        <body>
            <div class="message-container">
                <h1>Email Verification Successful</h1>
                <p>Thank you, ${result.name}. Your email has been successfully verified!</p>
            </div>
        </body>
    </html>
`);
});

const refreshToken = catchAsync(async (req, res) => {
	const { accessToken, refreshToken } = generateAuthToken(
		req.user?.id,
		req.user?.name
	);
	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'Success',
		tokens: {
			access: accessToken,
			refresh: refreshToken,
		},
	});
});

module.exports = {
	register,
	login,
	sendEmailVerification,
	verifyEmail,
	refreshToken,
};
