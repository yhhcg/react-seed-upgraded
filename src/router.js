import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { object } from 'prop-types';
import lodable from 'react-loadable';
/* Dynamically load reducer. */
import injectAsyncReducer from './injectAsyncReducer';
import { sagaManager } from './sagasInjector';

/* Router with lazy loaded pages. */
class Router extends React.Component {
  static contextTypes = {
    store: object,
  };

  constructor(props, context) {
    super(props);

    this.ListPage = lodable({
      loader: () => {
        /* Asynchronously load reducer. */
        injectAsyncReducer(
          context.store,
          /* Reducer name. */
          'list',
          /* Reducer function. */
          require('./List/reducer').default, // eslint-disable-line global-require
        );
        /**
         * Asynchronously load saga.
         *
         * If you take a action on multiple pages, dispatch the action on one of the pages,
         * the saga of other pages will be triggered.
         * In order to avoid that, the sagasInjector expose the sagaManager and you
         * can use it to inject saga and cancel saga. Refer to List/container how to do it.
         * If you control saga yourself, you can remove the following load.
         */
        sagaManager.startSaga(
          /* Saga name. */
          'list',
          /* Saga generator. */
          require('./List/saga').default, // eslint-disable-line global-require
        );
        return import('./List');
      },
      loading: () => {
        return <div>Loading...</div>;
      },
    });

    this.DetailPage = lodable({
      loader: () => {
        return import('./Detail');
      },
      loading: () => {
        return <div>Loading...</div>;
      },
    });
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={this.ListPage} />
        <Route exact path="/detail" component={this.DetailPage} />
      </Switch>
    );
  }
}

export default Router;
