import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory as createHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import configureStore from './store';
import App from './app';
import rootSaga from './saga';
import createReducer from './reducer';

/* Contains HTML5 browser history instance. */
/* eslint-disable import/prefer-default-export */
export const history = createHistory();

/* Represents history middleware to be injected into redux. */
const historyMiddleware = routerMiddleware(history);

/* Represents saga middleware. */
const sagaMiddleware = createSagaMiddleware();

/**
 * Create middlewares.
 * Disable logger middlewares in production mode.
 */
let middlewares = [historyMiddleware, sagaMiddleware];
if (process.env.NODE_ENV !== 'production') {
  middlewares = [...middlewares, logger];
}
/**
 * Represents the integration of redux store and react router.
 * Logger must be the last middleware in chain,
 * otherwise it will log thunk and promise, not actual actions.
 */
const store = configureStore(createReducer(history), compose(applyMiddleware(...middlewares)));

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app'),
);
