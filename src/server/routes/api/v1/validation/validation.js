import jsonschema, { Validator } from 'jsonschema';

import TrialApplicationSchema from './schemas/TrialApplication';

function checkNonEmptyString(instance, schema) {
  if (typeof instance !== 'string') {
    return null;
  }

  if (typeof schema.nonEmptyString !== 'boolean') {
    throw new jsonschema.SchemaError('"nonEmptyString" expects boolean', schema);
  }

  if (schema.nonEmptyString && instance.trim().length === 0) {
    return 'is an empty string';
  }

  return null;
}

function createValidator() {
  const validator = new Validator();
  validator.attributes.nonEmptyString = checkNonEmptyString;

  return validator;
}

function validateTrialApplication(input) {
  return createValidator().validate(input, TrialApplicationSchema);
}

export default validateTrialApplication;
