const ApiError = require('../utils/apiError');
const prisma = require('../../prisma/index');
const httpStatus = require('http-status');
const axios = require('axios');
const config = require('../configs/index');

const createPlan = async (body, userId) => {
	try {
		body.startDate = new Date(body.startDate);
		body.endDate = new Date(body.endDate);
		const days =
			Math.ceil((body.endDate - body.startDate) / (1000 * 60 * 60 * 24)) + 1;

		const plan = await prisma.plan.create({
			data: {
				userId: userId,
				...body,
			},
		});
		const planDetails = Array.from({ length: days }, (_, index) => ({
			day: index + 1,
			date: new Date(
				new Date(body.startDate).setDate(body.startDate.getDate() + index)
			),
			planId: plan.id,
		}));

		await prisma.planDetail.createMany({
			data: planDetails,
		});

		return plan;
	} catch (error) {
		console.log(error);
		throw new ApiError(httpStatus.status.INTERNAL_SERVER_ERROR, error.message);
	}
};

const getPlan = async (userId) => {
	return await prisma.plan.findMany({
		where: {
			userId: userId,
		},
	});
};

const getPlanById = async (planId) => {
	const plan = await prisma.plan.findFirst({
		where: {
			id: planId,
		},
		include: {
			planDetails: {
				include: {
					activities: {
						select: {
							destination: true,
						},
					},
					hotel: {
						include: {
							hotelDetail: true,
						},
					},
				},
			},
		},
	});

	if (!plan) {
		throw new ApiError(httpStatus.status.NOT_FOUND, 'Plan not found');
	}

	return plan;
};

const deletePlan = async (planId) => {
	await getPlanById(planId);

	return await prisma.plan.delete({
		where: {
			id: planId,
		},
	});
};

const getPlanDetail = async (planDetailId) => {
	const planDetail = await prisma.planDetail.findFirst({
		where: {
			id: planDetailId,
		},
		include: {
			activities: {
				select: {
					planDetail: true,
				},
			},
			hotel: true,
		},
	});

	if (!planDetail) {
		throw new ApiError(httpStatus.status.NOT_FOUND, 'Day not found');
	}
	return planDetail;
};

const addActivity = async (planDetailId, body) => {
	await getPlanDetail(planDetailId);
	body.cost = parseFloat(body.cost);
	return await prisma.activity.create({
		data: {
			planDetailId: planDetailId,
			...body,
		},
	});
};

const deleteActivity = async (activityId) => {
	const activity = await prisma.activity.findFirst({
		where: {
			id: activityId,
		},
	});

	if (!activity) {
		throw new ApiError(httpStatus.status.NOT_FOUND, 'Activity not found');
	}

	return await prisma.activity.delete({
		where: {
			id: activityId,
		},
	});
};

const addHotelToPlan = async (dayId, body) => {
	const plan = await prisma.plan.findFirst({
		where: {
			id: dayId,
		},
		include: {
			planDetails: {
				select: {
					id: true,
				},
			},
		},
	});

	return await prisma.hotelPlan.create({
		data: {
			planDetailId: plan.planDetails[0].id,
			...body,
		},
	});
};

const deleteHotelFromPlan = async (hotelPlanId) => {
	const hotelPlan = await prisma.hotelPlan.findFirst({
		where: {
			id: hotelPlanId,
		},
	});

	if (!hotelPlan) {
		throw new ApiError(httpStatus.status.NOT_FOUND, 'Hotel not found');
	}

	return await prisma.hotelPlan.delete({
		where: {
			id: hotelPlanId,
		},
	});
};

const sendMessageToBot = async (prompt) => {
	const result = await axios.post(
		`${config.machine_learning.baseUrl}/generate`,
		{
			prompt: prompt,
		}
	);
	return result.data;
};

const generateItinerary = async (planId) => {
	try {
		const travelData = await prisma.plan.findFirst({
			where: {
				id: planId,
			},
			include: {
				planDetails: true,
			},
		});
		const data = {
			city: travelData.city,
			travelCompanion: travelData.travelCompanion,
			budget: `Rp. ${travelData.budget}`,
			duration: travelData.planDetails.length,
			travelTheme: travelData.travelTheme,
		};
		const response = await axios.post(
			`${config.machine_learning.baseUrl}/itinerary`,
			data
		);
		const categoryNames = [
			...new Set(
				Object.values(response.data)
					.flat()
					.map((d) => d.category)
			),
		];

		const categories = await prisma.category.findMany({
			where: { name: { in: categoryNames } },
		});

		const travelDay = travelData.planDetails;
		const categoryMap = Object.fromEntries(
			categories.map((c) => [c.name, c.id])
		);
		const travelDayMap = Object.fromEntries(
			travelDay.map((td) => [td.day, td.id])
		);

		const destinations = [];
		const activities = [];
		Object.entries(response.data).forEach(([key, destinationsList]) => {
			const dayNumber = parseInt(key.replace('day', ''), 10);
			const planDetailId = travelDayMap[dayNumber];

			destinationsList.forEach(
				({ place_name, description, time, cost, category, address }) => {
					if (!categoryMap[category]) return;

					const destinationId = `temp-${place_name}`;
					destinations.push({
						id: destinationId,
						name: place_name,
						description: description,
						time: time,
						address: address,
						cost: cost,
						categoryId: categoryMap[category],
					});

					activities.push({
						planDetailId,
						destinationId,
					});
				}
			);
		});

		await prisma.destination.createMany({
			data: destinations.map(({ id, ...d }) => d),
		});

		const newDestinations = await prisma.destination.findMany({
			where: {
				name: { in: destinations.map((d) => d.name) },
			},
		});

		const destinationMap = Object.fromEntries(
			newDestinations.map((d) => [d.name, d.id])
		);

		const finalActivities = activities.map((a) => ({
			...a,
			destinationId: destinationMap[a.destinationId.replace('temp-', '')],
		}));

		await prisma.activity.createMany({ data: finalActivities });

		return response.data;
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	createPlan,
	getPlan,
	getPlanById,
	deletePlan,
	addActivity,
	getPlanDetail,
	deleteActivity,
	addHotelToPlan,
	deleteHotelFromPlan,
	sendMessageToBot,
	generateItinerary,
};
