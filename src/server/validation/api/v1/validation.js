import { Validator } from 'jsonschema';

import TrialApplicationSchema from './schemas/TrialApplication';

function validateTrialApplication(input) {
  return new Validator().validate(input, TrialApplicationSchema);
}

export default validateTrialApplication;
