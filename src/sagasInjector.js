import { createStore } from 'redux';
import { take, fork, cancel } from 'redux-saga/effects';

const CANCEL_SAGAS_ACTION = Symbol('CANCEL_SAGAS_HMR');
let sagaMiddleware;
/* We will use it to dispatch a cancel action */
let store;

/**
 * Return a generator to be run in saga.
 * In this generator, we start to run saga asynchronously.
 * Then listen to cancel action.
 * Corresponding Cancel action is emitted by sagaManager.cancelSaga.
 * @param {string} sagaName
 * @param {Function} saga
 */
function createAbortableSaga(sagaName, saga) {
  return function* main() {
    /* Only obtained task is cancellable */
    const sagaTask = yield fork(saga);
    const { payload } = yield take(CANCEL_SAGAS_ACTION);
    if (payload === sagaName) {
      yield cancel(sagaTask);
    }
  };
}

/**
 * Export to run and cancel saga.
 */
const sagaManager = {
  startSaga(sagaName, saga) {
    sagaMiddleware.run(createAbortableSaga(sagaName, saga));
  },

  cancelSaga(sagaName) {
    store.dispatch({
      type: CANCEL_SAGAS_ACTION,
      payload: sagaName,
    });
  },
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
  sagaMiddleware.run(rootSaga);
  return store;
}

/**
 * Export to receive sagaMiddleware.
 * SagaMiddleware should be settled to run rootSaga in createInjectSagasStore before creating store.
 */
function setSagaMiddleware(middleware) {
  sagaMiddleware = middleware;
}

export {
  setSagaMiddleware,
  sagaManager,
};

export default createInjectSagasStore;
