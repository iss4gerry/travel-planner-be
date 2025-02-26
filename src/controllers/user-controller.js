const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const userService = require('../services/user-service');

const getUser = catchAsync(async (req, res) => {
	const result = await userService.getUserById(req.params.userId);
	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'Success',
		data: result,
	});
});

const updateUser = catchAsync(async (req, res) => {
	const result = await userService.updateUser(req.params.userId, req.body);
	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'Success',
		data: result,
	});
});

const changeProfilePicture = catchAsync(async (req, res) => {
	const image = req.file;
	if (!image) {
		throw new ApiError(
			httpStatus.status.BAD_REQUEST,
			'Please upload image files'
		);
	}

	const result = await userService.changeProfilePicture(req.user.id, image);
	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'Success',
		data: result,
	});
});

const deleteUser = catchAsync(async (req, res) => {
	const result = await userService.deleteUser(req.params.userId);
	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'User deleted successfully',
		data: result,
	});
});

const userActivity = catchAsync(async (req, res) => {
	const result = await userService.userActivity(req.user.id);
	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'Success',
		data: result,
	});
});

const requestResetPassword = catchAsync(async (req, res) => {
	await userService.requestResetPassword(req.params.userId, req.body.password);
	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'Password reset link sent.',
	});
});

const resetPassword = catchAsync(async (req, res) => {
	const result = await userService.resetPassword(req.user.id, req.password);

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
                <h1>Password Reset Successful</h1>
                <p>Thank you, ${result.name}. Your password has been successfully reset!</p>
            </div>
        </body>
    </html>
`);
});

module.exports = {
	getUser,
	updateUser,
	deleteUser,
	requestResetPassword,
	resetPassword,
	userActivity,
	changeProfilePicture,
};
