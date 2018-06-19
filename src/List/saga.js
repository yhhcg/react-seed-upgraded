/* eslint-disable require-jsdoc */
import {put, takeEvery} from 'redux-saga/effects';

import {
  async,
} from './actions';

const {
  FETCH_SOME_ASYNC_REQUEST,
  fetchSomeAsyncRequestSucceed,
  fetchSomeAsyncRequestFailure,
} = async;

export function* mockFetch() {
  try {
    yield new Promise((resolve) => {
      return setTimeout(() => {
        resolve();
      }, 1000);
    });

    // Fire success action
    yield put(fetchSomeAsyncRequestSucceed());
  } catch (err) {
    // Fire failure action
    yield put(fetchSomeAsyncRequestFailure(err));
  }
}

export default function* () {
  yield takeEvery(FETCH_SOME_ASYNC_REQUEST, mockFetch);
}
