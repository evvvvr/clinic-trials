import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import ApplyForTrial from './TrialApplication/ApplyForTrial';
import TrialApplicationSubmitted from './TrialApplication/TrialApplicationSubmitted';
import NotFound from './NotFound';

const App = () => (
  <Router history={browserHistory}>
    <Route path="/" component={ApplyForTrial} />
    <Route path="/success" component={TrialApplicationSubmitted} />
    <Route path="*" component={NotFound} />
  </Router>
);

export default App;
