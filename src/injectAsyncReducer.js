/* eslint-disable require-jsdoc */
import createReducer from './reducer';

/**
 * asynchronously inject reducer
 * @param  {object} store - Redux store
 * @param  {string} name - Reducer name
 * @param  {function} asyncReducer - Reducer function
 */
export default function injectAsyncReducer(store, name, asyncReducer) {
  // store.asyncReducers, remember ?
  // We created the extra attribute in the configureStore function!
  store.asyncReducers[name] = asyncReducer;
  // store.replaceReducer is a native method part of the redux store,
  // which replaces the current reducer
  // used by the store to calculate the state
  // -> https://github.com/reactjs/redux/blob/master/docs/api/Store.md#replaceReducer
  store.replaceReducer(createReducer(store.asyncReducers));
}
