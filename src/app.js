import React from 'react';
import {CssBaseline} from 'material-ui';
import {hot} from 'react-hot-loader';

import Router from './router';

const App = () => (
  <div>
    <CssBaseline />
    <Router />
  </div>
);

export default hot(module)(App);
