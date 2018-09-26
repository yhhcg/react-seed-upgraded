import { put, takeEvery } from 'redux-saga/effects';
import {
  async,
} from './actions';

const {
  fetchSomeAsyncRequest,
} = async;

export function* mockFetch() {
  try {
    yield new Promise((resolve) => {
      return setTimeout(() => {
        resolve();
      }, 1000);
    });

    /* Fire success action. */
    yield put(fetchSomeAsyncRequest.success());
  } catch (err) {
    /* Fire failure action. */
    yield put(fetchSomeAsyncRequest.failure(err));
  }
}

export default function* () {
  yield takeEvery(fetchSomeAsyncRequest.TYPE, mockFetch);
}
