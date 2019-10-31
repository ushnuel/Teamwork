/* eslint-disable no-console */
import '@babel/polyfill';
import express, { json, urlencoded } from 'express';
import cors from 'cors';

import Routes from './Routes';
import config from './Config';
import { FeedbackHandler } from './Helpers';

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
app.use('/api/v1', Routes);
app.use(FeedbackHandler.error);

app.set('port', config.PORT);

app.listen(config.PORT, () => {
  console.log('Server started on port', config.PORT);
});

export default app;
