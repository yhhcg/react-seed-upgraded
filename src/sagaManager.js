import { take, fork, cancel } from 'redux-saga/effects';

/* We will use it to dispatch a cancel action to stop saga. */
const CANCEL_SAGAS_HMR = 'CANCEL_SAGAS_HMR';
let sagaMiddleware;
let store;

/**
 * Export the function to receive sagaMiddleware.
 * Get the saga middleware in './index.js'.
 * @param {Function} middleware
 */
function setSagaMiddleware(middleware) {
  sagaMiddleware = middleware;
}

/**
 * Export the function to receive store object.
 * Get the store object in './index.js'.
 * store.injectedSagas, remember?
 * We created this extra attribute in the configureStore function.
 * @param {Object} storeObject
 */
function setStore(storeObject) {
  store = storeObject;
}

/**
 * Return a generator to be running saga using the middleware.run API.
 * @param {string} sagaName
 * @param {Function} saga - Generator function.
 */
function createAbortableSaga(sagaName, saga) {
  return function* main() {
    /* Fork tasks that execute in the background. Only obtained task is cancellable. */
    const sagaTask = yield fork(saga);
    /* Last place to store, make sure it is saved */
    store.injectedSagas[sagaName] = saga;
    /* Wait for the cancel saga action. */
    const { payload } = yield take(CANCEL_SAGAS_HMR);
    if (payload === sagaName) {
      /* Abort the background task via stop api. */
      yield cancel(sagaTask);
    }
  };
}

/**
 * When load a async saga file, we need inject it first,
 * then it loaded, after then, we can run or stop it.
 * If the saga with the key already exists, do nothing, or force to update.
 */
function injectSaga(sagaName, saga, force = false) {
  const savedSaga = store.injectedSagas[sagaName];
  if (!savedSaga || force) {
    store.injectedSagas[sagaName] = saga;
  }
}

/**
 * Cancel a injected saga according to saga name.
 * @param {string} sagaName
 */
function stopSaga(sagaName) {
  store.dispatch({
    type: CANCEL_SAGAS_HMR,
    payload: sagaName,
  });
}

/**
 * Get saga from store.injectedSagas and run.
 * @param {string} sagaName
 */
function startSaga(sagaName) {
  const saga = store.injectedSagas[sagaName];
  if (!saga) {
    throw Error(`${sagaName} saga must be injected first!`);
  }
  /* Cancel it before starting, preventing two identical saga from running. */
  stopSaga(sagaName);
  sagaMiddleware.run(createAbortableSaga(sagaName, saga));
}

export {
  setSagaMiddleware,
  setStore,
};

export default {
  inject: injectSaga,
  start: startSaga,
  stop: stopSaga,
};
