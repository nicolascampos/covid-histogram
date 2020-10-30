/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import ReactDOM from 'react-dom';

import store from './store';

import { testAction } from './constants/actions';

ReactDOM.render(
  <p>Test</p>,
  document.getElementById('root'),
);

store.dispatch(testAction('Test'));
