import { createStore } from 'redux';
import { take, fork, cancel } from 'redux-saga/effects';

const CANCEL_SAGAS_ACTION = Symbol('CANCEL_SAGAS_HMR');
let sagaMiddleware;

/** Save created store
 * We will use it to dispatch a cancel action
 */
let store;

/**
 * Listens cancel action.
 * If payload matches key,
 * cancel the previous listener.
 * */
function createAbortableSaga(key, saga) {
  return function* main() {
    /* Start to run saga asynchronously, and return a task,
     * only task is cancellable.
     */
    const sagaTask = yield fork(saga);
    const { payload } = yield take(CANCEL_SAGAS_ACTION);
    if (payload === key) {
      yield cancel(sagaTask);
    }
  };
}

const SagaManager = {
  /**
   * Add listener to sagaMiddleware,
   * it listens cancel action.
   * */
  startSaga(key, saga) {
    sagaMiddleware.run(createAbortableSaga(key, saga));
  },

  cancelSaga(key) {
    store.dispatch({
      type: CANCEL_SAGAS_ACTION,
      payload: key,
    });
  },
};

/**
 * Create Store with reducer and saga enhancers,
 * which keeps sagas injected, could  be cancel later.
 * */
function createInjectSagasStore(rootSaga, initialReducers, ...args) {
  if (!sagaMiddleware) {
    throw Error('sagaMiddleware must be set first!');
  }
  store = createStore(initialReducers, ...args);
  sagaMiddleware.run(rootSaga);
  return store;
}

/**
 * Set sagaMiddleware, before create store.
 * @param middleware
 */
function setSagaMiddleware(middleware) {
  sagaMiddleware = middleware;
}

export {
  setSagaMiddleware,
  SagaManager,
};

export default createInjectSagasStore;
