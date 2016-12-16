/* eslint-disable no-console */

import bodyParser from 'body-parser';
import express from 'express';
import path from 'path';

import AppDefaults from './AppDefaults';
import db from './db/models/db';
import handleError from './middleware/handleError';
import api from './routes/api';
import { checkDBConnection } from './db/db-utils';

const port = process.env.PORT || AppDefaults.Port;

function startServer() {
  const app = express();

  app.use(express.static('./public'));
  app.get('*', (request, response) => {
    response.sendFile(path.resolve('./public', 'index.html'));
  });

  app.use('/api', bodyParser.json());
  app.use('/api', api);

  app.use(handleError);

  console.log('Starting server...\n');

  const server = app.listen(port, () => {
    console.log(`Listening on port ${port}\n`);
  });

  return server;
}

function checkConfig() {
  const DbURL = process.env.DB_URL;

  if (!DbURL) {
    return Promise.reject('Please, provide database URL in DB_URL environment variable.');
  }

  return Promise.resolve({
    DbURL,
  });
}

const serverStart = checkConfig()
  .then(config => checkDBConnection(config.DbURL))
  .then(() => db.init())
  .then(() => startServer())
  .catch((err) => {
    console.error(`${err}\n`);
    process.exit(1);
  });

export default serverStart;
