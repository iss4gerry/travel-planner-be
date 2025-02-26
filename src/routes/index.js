const express = require('express');
const authRouter = require('./auth-route');
const testRouter = require('./test-route');
const adsRouter = require('./ads-route');
const userRouter = require('../routes/user-route');
const hotelRouter = require('../routes/hotel-route');
const planRouter = require('./plan-route');

const router = express.Router();

const defaultRoutes = [
	{
		path: '/auth',
		route: authRouter,
	},
	{
		path: '/test',
		route: testRouter,
	},
	{
		path: '/ads',
		route: adsRouter,
	},
	{
		path: '/user',
		route: userRouter,
	},
	{
		path: '/hotels',
		route: hotelRouter,
	},
	{
		path: '/plans',
		route: planRouter,
	},
];

defaultRoutes.forEach((route) => {
	router.use(route.path, route.route);
});

module.exports = router;
