import express from 'express';
import HttpStatus from 'http-status-codes';

const api = express.Router();

api.post('/trials/applications', (request, response) => {
  console.log(request.body);
  response.sendStatus(HttpStatus.CREATED);
});

export default api;
