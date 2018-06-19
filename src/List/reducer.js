/**
 * This module receives redux actions and responses with action handlers
 */
import {
  async,
} from './actions';

const {
  FETCH_SOME_ASYNC_REQUEST,
  FETCH_SOME_ASYNC_REQUEST_SUCCEED,
  FETCH_SOME_ASYNC_REQUEST_FAILURE,
} = async;

/**
 * Initial state value of react store
 */
const initialState = {
  isLoading: false,
  count: 1,
};

/**
 * Reducer function manipulates home leaf node of redux store
 * @param {Object} state - Previous leaf node of redux store
 * @param {Object} action - Redux action
 * @param {string} action.type - Redux action name
 * @return {Object}
 */
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
