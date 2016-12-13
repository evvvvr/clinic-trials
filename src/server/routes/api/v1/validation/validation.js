import { Validator } from 'jsonschema';

import TrialApplicationSchema from './schemas/TrialApplication';

function createValidator() {
  const validator = new Validator();
  validator.customFormats.name = input => input.trim().length > 0;

  return validator;
}

function validateTrialApplication(input) {
  return createValidator().validate(input, TrialApplicationSchema);
}

export default validateTrialApplication;
