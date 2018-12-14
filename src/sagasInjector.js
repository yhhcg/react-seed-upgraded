import { createStore } from 'redux';
import { take, fork, cancel } from 'redux-saga/effects';

/* We will use it to dispatch a cancel action to stop saga. */
const CANCEL_SAGAS_ACTION = 'CANCEL_SAGAS_HMR';
let sagaMiddleware;
let store;

/**
 * Return a generator to be run in saga. In this generator, we start to run saga asynchronously.
 * Then listen to cancel action.
 * Corresponding Cancel action is emitted by sagaManager.cancelSaga.
 * @param {string} sagaName
 * @param {function} saga
 */
function createAbortableSaga(sagaName, saga) {
  return function* main() {
    /* Only obtained task is cancellable */
    const sagaTask = yield fork(saga);
    /* Last place to store, make sure it is saved */
    store.injectedSagas[sagaName] = saga;
    const { payload } = yield take(CANCEL_SAGAS_ACTION);
    if (payload === sagaName) {
      yield cancel(sagaTask);
    }
  };
}

/**
 * Cancel a injected saga.
 * @param sagaName
 */
function stopSaga(sagaName) {
  store.dispatch({
    type: CANCEL_SAGAS_ACTION,
    payload: sagaName,
  });
}

/**
 * Run a injected saga, can not reset saga.
 * @param sagaName
 */
function startSaga(sagaName) {
  const saga = store.injectedSagas[sagaName];
  if (!saga) {
    throw Error('Saga must be injected first!');
  }
  /* Cancel it before start, for it may have been run, will cause two same running. */
  stopSaga(sagaName);
  sagaMiddleware.run(createAbortableSaga(sagaName, saga));
}

/**
 * When load a async saga file, we need inject it first,
 * then it loaded, after then, we can run or stop it.
 * If the saga with the key already exists, do nothing, or force to update.
 * */
function injectSaga(sagaName, saga, force = false) {
  const savedSaga = store.injectedSagas[sagaName];
  if (!savedSaga || force) {
    store.injectedSagas[sagaName] = saga;
  }
}

/**
 * Export three apis.
 */
const sagaManager = {
  stop: stopSaga,
  inject: injectSaga,
  start: startSaga,
};

/**
 * Create Store with reducer and saga enhancers,
 * which keeps sagas injected, could  be cancelled later,
 * then run initial saga.
 */
function createInjectSagasStore(rootSaga, initialReducers, ...args) {
  if (!sagaMiddleware) {
    throw Error('sagaMiddleware must be settled first!');
  }
  store = createStore(initialReducers, ...args);
  /* Save injected key-listeners */
  store.injectedSagas = {};
  sagaMiddleware.run(rootSaga);
  return store;
}

/**
 * Export to receive sagaMiddleware.
 * SagaMiddleware should be settled to run rootSaga in createInjectSagasStore before creating store.
 * @param middleware
 */
function setSagaMiddleware(middleware) {
  sagaMiddleware = middleware;
}

export {
  setSagaMiddleware,
  sagaManager,
};

export default createInjectSagasStore;
