/* global document */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'redux-simple-router';
import reducers from './reducers';

import AppContainer from './containers/AppContainer';

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}));

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore);
const store = createStoreWithMiddleware(reducer);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="*" component={AppContainer} />
    </Router>
  </Provider>,
  document.getElementById('mount')
);
