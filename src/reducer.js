/* This module composes root reducer including react-router. */
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';

/* App reducer maintain states to be shared across modules. */
const app = (state = { city: 330100 }) => {
  return state;
};

/**
 * This is a create reducer function.
 * It returns current permanent and asynchronously loaded reducers.
 * @param  {function} asyncReducers - asynchronously loaded recuders.
 * @return {object} - root reducer.
 */
export default function createReducer(asyncReducers) {
  /**
   * Return root reducer.
   * Name of each leaf store should match Page Name or Functionality Name.
   */
  return combineReducers({
    /* Permanent redux reducers. */
    router,
    app,
    /* Aync reducers. */
    ...asyncReducers,
  });
}
