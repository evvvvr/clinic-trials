import Sequelize, { UniqueConstraintError } from 'sequelize';

export function checkDBConnection(dbURL) {
  return new Sequelize(dbURL, { logging: false })
    .authenticate()
    .then(() => Promise.resolve())
    .catch(err => Promise.reject(`Could not connect to database: ${err}`));
}

export function isErrorUniqueConstraintViolation(err) {
  return err instanceof UniqueConstraintError;
}
