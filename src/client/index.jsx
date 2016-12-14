import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import api from './api';
import App from './components/App';

api.init({
  URL: `${location.origin}/api/v1`,
  timeout: 3000,
});

ReactDOM.render(<App />, document.querySelector('.app'));
