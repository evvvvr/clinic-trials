import express from 'express';
import HttpStatus from 'http-status-codes';

import validateTrialApplication from './validation/validation';

const api = express.Router();

api.post('/trials/applications', (request, response) => {
  const validationResult = validateTrialApplication(request.body);

  if (!validationResult.valid) {
    response.status(HttpStatus.BAD_REQUEST).json(validationResult);
  } else {
    response.sendStatus(HttpStatus.CREATED);
  }
});

export default api;
