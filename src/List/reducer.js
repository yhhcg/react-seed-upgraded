/* eslint-disable require-jsdoc */
import {
  async,
} from './actions';

const {
  fetchSomeAsyncRequest,
} = async;

const initialState = {
  isLoading: false,
  count: 1,
};

export default function Reducer(state=initialState, action) {
  switch (action.type) {
    case fetchSomeAsyncRequest.TYPE:
      return {
        ...state,
        isLoading: true,
      };
    case fetchSomeAsyncRequest.SUCCESS:
      return {
        ...state,
        isLoading: false,
        count: state.count + 1,
      };
    case fetchSomeAsyncRequest.FAILURE:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
}
