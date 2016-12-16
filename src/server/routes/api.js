import express from 'express';
import HttpStatus from 'http-status-codes';
import routesVersioning from 'express-routes-versioning';

import postTrialsApplication from '../handlers/api/v1/applications';

const routesVersion = routesVersioning();
const api = express.Router();

api.post(
  '/trials/applications',
  routesVersion({
    '1.0.0': postTrialsApplication,
  },
  (request, response) => response.status(HttpStatus.NOT_FOUND).end())
);

export default api;
