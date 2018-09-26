import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { object } from 'prop-types';
import lodable from 'react-loadable';
/* Dynamically load reducer. */
import injectAsyncReducer from './injectAsyncReducer';

/* Router with lazy loaded pages. */
class Router extends React.Component {
  static contextTypes = {
    store: object,
  };

  constructor(props, context) {
    super(props);

    this.ListPage = lodable({
      loader: () => {
        /* Aynchronously load reducer. */
        injectAsyncReducer(
          context.store,
          /* Reducer name. */
          'list',
          /* Reducer function. */
          require('./List/reducer').default, // eslint-disable-line global-require
        );

        return import('./List/container');
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
