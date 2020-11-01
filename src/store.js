import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './App/reducers/rootReducer';

export default createStore(
  rootReducer,
  applyMiddleware(thunk),
);
