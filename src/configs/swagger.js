const swaggerJsdoc = require('swagger-jsdoc');

const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Trexense API Documentation',
			version: '1.0.0',
			description: 'API Documentation for Trexense',
		},
	},
	apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerSpec };
