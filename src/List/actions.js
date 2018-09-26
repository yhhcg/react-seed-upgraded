/* eslint-disable require-jsdoc */
import { Async } from 'redux-action-boilerplate';

export const async = new Async({
  prefix: 'list',
  actions: [
    'fetchSomeAsyncRequest',
  ],
});
