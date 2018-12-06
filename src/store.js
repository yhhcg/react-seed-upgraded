/**
 * This module composes redux store instance.
 * Redux store manages many complex states for the app.
 */
import rootSage from './saga';
import createInjectSagasStore from './sagasInjector';


/**
 * Factory composing react store with reducers and middlewares.
 * @param  {Object} rootReducer - Root reducer with router state
 * @param  {Object} initialState - An instance by calling applyMiddleware.
 */
export default function configureStore(rootReducer, initialState) {
  const store = createInjectSagasStore(rootSage, rootReducer, initialState);

  // Enable Webpack hot module replacement for reducers
  // if (module.hot) {
  //   module.hot.accept('./reducer', () => {
  //     store.replaceReducer(createReducer(store.asyncReducers));
  //   });
  // }

  /**
   * Extensions.
   * Async reducer registry, adding an extra attribute to the store object.
   */
  store.asyncReducers = {};

  return store;
}
