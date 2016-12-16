import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved */
import '../../node_modules/normalize-css/normalize.css';
import './styles/app.less';
/* eslint-enable import/no-extraneous-dependencies, import/no-unresolved */

import api from './api';
import App from './components/App';

api.init({
  URL: `${location.origin}/api`,
  timeout: 3000,
});

ReactDOM.render(<App />, document.querySelector('.app'));
