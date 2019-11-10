/* eslint-disable comma-dangle */
/* eslint-disable indent */
import '@babel/polyfill';
import express, { json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import Routes from './Routes';
import config from './Config';
import { FeedbackHandler, ErrorHandler } from './Helpers';

const debug = require('debug')('http');

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Authorization, Content-Type');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE',
  );
  next();
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(morgan('dev'));
app.use('/api/v1', Routes);

app.get('/', (req, res) => res.json({
    message: 'Welcome to Warefarer server API homepage',
  }),);

app.use('*', (req, res, next) => {
  const error = new ErrorHandler('Page Not Found', 404);
  next(error);
});

app.use(FeedbackHandler.error);

app.set('port', config.PORT);

app.listen(config.PORT, () => {
  debug('Server started on port', config.PORT);
});

export default app;
