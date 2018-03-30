import {all} from 'redux-saga/effects';

import list from './List/saga';

/**
 * Root saga
 */
export default function* rootSaga() {
  yield all([
    list(),
  ]);
}
