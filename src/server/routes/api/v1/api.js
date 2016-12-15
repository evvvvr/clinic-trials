import express from 'express';
import HttpStatus from 'http-status-codes';

import db from '../../../db/models/db';
import { isErrorUniqueConstraintViolation } from '../../../db/db-utils';
import validateTrialApplication from './validation/validation';

const api = express.Router();

api.post('/trials/applications', (request, response, next) => {
  const validationResult = validateTrialApplication(request.body);

  if (!validationResult.valid) {
    response
      .status(HttpStatus.BAD_REQUEST)
      .json({
        errors: validationResult.errors,
      });
  } else {
    db.application
      .create(request.body)
      .then(application =>
        response
          .status(HttpStatus.CREATED)
          .json(application)
      )
      .catch((err) => {
        if (isErrorUniqueConstraintViolation(err)) {
          response
            .status(HttpStatus.CONFLICT)
            .end();
        } else {
          next(err);
        }
      });
  }
});

export default api;
