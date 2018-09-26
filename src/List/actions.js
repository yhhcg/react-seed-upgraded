import { Async } from 'redux-action-boilerplate';

export const async = new Async({ // eslint-disable-line import/prefer-default-export
  prefix: 'list',
  actions: [
    'fetchSomeAsyncRequest',
  ],
});
