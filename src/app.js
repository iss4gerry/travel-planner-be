const express = require('express');
const passport = require('passport');
const cors = require('cors');
const morgan = require('morgan');
const errorHandler = require('./middlewares/error');
const swaggerUi = require('swagger-ui-express');
const { swaggerSpec } = require('./configs/swagger');
const router = require('./routes/index');
const config = require('./configs/index');
const {
	accessStrategy,
	refreshStrategy,
	emailStrategy,
	passwordStrategy,
} = require('./configs/passport');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
	'/api-docs',
	swaggerUi.serve,
	swaggerUi.setup(swaggerSpec, {
		customCss:
			'.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
		customCssUrl:
			'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css',
	})
);

app.use(passport.initialize());
passport.use('jwt-access', accessStrategy);
passport.use('jwt-refresh', refreshStrategy);
passport.use('jwt-email', emailStrategy);
passport.use('jwt-password', passwordStrategy);

app.use(cors());
app.use('*', cors());
app.use(morgan('dev'));

app.get('/', (req, res) => {
	res.send('Hewoo Wuddd');
});

app.listen(config.port, () => {
	console.log(`Server running on port ${config.port}`);
});

app.use(router);

app.use(errorHandler);
