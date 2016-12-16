import request from 'request';

let apiConfig;

const api = {
  init(config) {
    apiConfig = {
      URL: config.URL,
      timeout: config.timeout,
      applicationsURL: `${config.URL}/trials/applications`,
      version: '1.0',
    };
  },

  submitTrialApplication(patientData, callback) {
    request
      .post({
        url: apiConfig.applicationsURL,
        json: patientData,
        timeout: apiConfig.timeout,
        headers: {
          'accept-version': apiConfig.version,
        },
      }, callback)
      .on('error', (error) => {
        callback(error);
      });
  },
};

export default api;
