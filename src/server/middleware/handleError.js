import HttpStatus from 'http-status-codes';

function handleError(error, request, response, next) {
  const errorMessage = error.stack ? error.stack : error;
  console.error(`Error occured: ${errorMessage}\n`);

  if (response.headersSent) {
    return next(error);
  }

  return response.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
}

export default handleError;
