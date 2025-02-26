const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const adsService = require('../services/ads-service');
const ApiError = require('../utils/apiError');

const uploadBanner = catchAsync(async (req, res) => {
	const image = req.file;
	if (!image) {
		throw new ApiError(
			httpStatus.status.BAD_REQUEST,
			'Please upload image files'
		);
	}
	const body = Object.assign({}, req.body);

	const result = await adsService.saveAdBanner(image, body, req.user.id);
	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'Success',
		data: result,
	});
});

const getAllBanners = catchAsync(async (req, res) => {
	const { totalCount, bannerData } = await adsService.getAllBanners(
		req.query.page,
		req.query.limit,
		req.query.isPaid
	);
	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'Success',
		data: bannerData,
		pagination: {
			totalItems: Number(totalCount),
			totalPage: Math.ceil(Number(totalCount / req.query.limit)),
			currentPage: Number(req.query.page),
			pageSize: Number(req.query.limit),
		},
	});
});

const getBannerById = catchAsync(async (req, res) => {
	const result = await adsService.getBannerById(req.params.bannerId);
	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'Success',
		data: result,
	});
});

const deleteBannerById = catchAsync(async (req, res) => {
	const result = await adsService.deleteBannerById(req.params.bannerId);
	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'Success',
		data: result,
	});
});

const updateBanner = catchAsync(async (req, res) => {
	let image = req.file;
	if (!image) {
		image = false;
	}
	let body = Object.assign({}, req.body);
	const result = await adsService.updateBanner(
		req.params.bannerId,
		body,
		image
	);
	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'Success',
		data: result,
	});
});

const changeBannerPaidStatus = catchAsync(async (req, res) => {
	const result = await adsService.changeBannerPaidStatus(req.params.bannerId);
	res.status(httpStatus.status.OK).send({
		status: httpStatus.status.OK,
		message: 'Success',
		data: result,
	});
});

module.exports = {
	uploadBanner,
	getAllBanners,
	getBannerById,
	deleteBannerById,
	updateBanner,
	changeBannerPaidStatus,
};
