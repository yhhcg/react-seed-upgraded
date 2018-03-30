import {
  FETCH_SOME_ASYNC_REQUEST,
  FETCH_SOME_ASYNC_SUCCEED,
  FETCH_SOME_ASYNC_FAILURE,
} from './actionTypes';

export const fetchSomeAsyncRequest = () => (
  {
    type: FETCH_SOME_ASYNC_REQUEST,
  }
);

export const fetchSomeAsyncSucceed = () => (
  {
    type: FETCH_SOME_ASYNC_SUCCEED,
    // payload: {
    //   response,
    // },
  }
);

export const fetchSomeAsyncFailure = () => (
  {
    type: FETCH_SOME_ASYNC_FAILURE,
  }
);
