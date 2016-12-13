import request from 'request';

let apiConfig;

const api = {
  init(config) {
    apiConfig = {
      URL: config.URL,
      timeout: config.timeout,
      applicationsURL: `${config.URL}/trials/applications`,
    };
  },

  submitTrialApplication(patientData, callback) {
    request
      .post(apiConfig.applicationsURL, {
        json: patientData,
        timeout: apiConfig.timeout,
      }, callback)
      .on('error', (error) => {
        callback(error);
      });
  },
};

export default api;
