import { Validator } from 'jsonschema';

import TrialApplicationSchema from './schemas/TrialApplication';

export default function validateTrialApplication(input) {
  return new Validator().validate(input, TrialApplicationSchema);
}
