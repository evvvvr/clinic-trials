const TrialApplication = {
  id: 'api/v1/trials/applications',
  type: 'object',
  properties: {
    gender: {
      type: 'string',
      enum: ['female', 'male'],
    },
    firstName: {
      type: 'string',
      pattern: '^\\S(.*\\S)?$',
      minLength: 1,
      maxLength: 255,
    },
    lastName: {
      type: 'string',
      pattern: '^\\S(.*\\S)?$',
      minLength: 1,
      maxLength: 255,
    },
    email: {
      type: 'string',
      format: 'email',
      maxLength: 255,
    },
    phone: {
      type: 'string',
      pattern: '^\\+?(\\d{7,12})$',
      minLength: 7,
      maxLength: 12,
    },
    age: {
      type: 'integer',
      minimum: 1,
      maximum: 99,
    },
    zip: {
      type: 'string',
      pattern: '^\\d{3,5}$',
      minLength: 3,
      maxLength: 5,
    },
  },
  required: ['gender', 'firstName', 'lastName', 'email', 'phone', 'age', 'zip'],
};

export default TrialApplication;
