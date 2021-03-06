/**
 * This module composes redux store instance.
 * Redux store manages many complex states for the app.
 */
import { createStore } from 'redux';

/**
 * Factory composing react store with reducers and middlewares.
 * @param  {Object} rootReducer - Root reducer with router state
 * @param  {Object} initialState - An instance by calling applyMiddleware.
 */
export default function configureStore(rootReducer, initialState) {
  const store = createStore(rootReducer, initialState);

  /**
   * Extensions.
   * Saga registry, adding an extra attribute to the store object.
   */
  store.injectedSagas = {};

  /**
   * Extensions.
   * Async reducer registry, adding an extra attribute to the store object.
   */
  store.asyncReducers = {};

  return store;
}
