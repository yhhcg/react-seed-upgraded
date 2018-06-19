/* eslint-disable require-jsdoc */
import {
  async,
} from './actions';

const {
  FETCH_SOME_ASYNC_REQUEST,
  FETCH_SOME_ASYNC_REQUEST_SUCCEED,
  FETCH_SOME_ASYNC_REQUEST_FAILURE,
} = async;

const initialState = {
  isLoading: false,
  count: 1,
};

export default function Reducer(state=initialState, action) {
  switch (action.type) {
    case FETCH_SOME_ASYNC_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_SOME_ASYNC_REQUEST_SUCCEED:
      return {
        ...state,
        isLoading: false,
        count: state.count + 1,
      };
    case FETCH_SOME_ASYNC_REQUEST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
