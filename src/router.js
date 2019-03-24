/* eslint-disable global-require */
import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { object } from 'prop-types';
import loadable from 'react-loadable';
/* Dynamically load reducer. */
import injectAsyncReducer from './injectAsyncReducer';
import sagaManager from './sagaManager';

/* Router with lazy loaded pages. */
class Router extends React.Component {
  static createLoadableComponent(context, routeName, routeOption) {
    const {
      component,
      reducer,
      reducerPath,
      saga,
      sagaPath,
      startSaga,
    } = routeOption;
    const reducerName = routeName;
    const sagaName = routeName;

    const loadReducer = () => {
      /* Asynchronously load reducer. */
      injectAsyncReducer(context.store, reducerName, reducer());

      if (module.hot) {
        module.hot.accept(reducerPath, () => {
          injectAsyncReducer(context.store, reducerName, reducer());
        });
      }
    };

    const loadSaga = () => {
      /**
       * Asynchronously load saga, inject saga.
       */
      sagaManager.inject(sagaName, saga());
      /**
       * If you take a action on multiple pages, dispatch the action on one of the pages,
       * the saga of other pages will be triggered.
       * In order to avoid that, the sagasInjector expose the sagaManager and you
       * can use it to start saga and stop saga. Refer to List/container how to do it.
       * If you control saga yourself, you can remove the following load.
       */
      if (startSaga) sagaManager.start(sagaName);

      if (module.hot) {
        module.hot.accept(sagaPath, () => {
          sagaManager.stop(sagaName);
          sagaManager.inject(sagaName, saga(), true);
          sagaManager.start(sagaName);
        });
      }
    };

    const loadableComponent = loadable({
      loader: () => {
        if (routeOption.reducer) { loadReducer(); }
        if (routeOption.saga) { loadSaga(); }

        return component();
      },
      loading: (prop) => {
        /* If there throws error out of react component, we can only receive here */
        if (prop.error) {
          throw prop.error;
        }
        return <div>Loading...</div>;
      },
    });

    return loadableComponent;
  }

  static createLoadables(context, routeNames, routeOptions) {
    const loadables = {};

    routeNames.forEach((routeName) => {
      loadables[routeName] = Router.createLoadableComponent(context, routeName, routeOptions[routeName]);
    });

    return loadables;
  }

  static contextTypes = {
    store: object,
  };

  routeOptions = {
    detail: {
      /* Page component. */
      component: () => import('./Detail'),
    },
    list: {
      /* Page component. */
      component: () => import('./List'),
      /* Dynamic require reducer for updating reducer once hot. */
      reducer: () => require('./List/reducer').default,
      reducerPath: './List/reducer',
      /* Dynamic require saga for updating saga once hot. */
      saga: () => require('./List/saga').default,
      sagaPath: './List/saga',
      /* Whether to start saga. */
      startSaga: true,
    },
  }

  constructor(props, context) {
    super(props);

    const routeNames = Object.keys(this.routeOptions);
    this.loadables = Router.createLoadables(context, routeNames, this.routeOptions);
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={this.loadables.list} />
        <Route exact path="/detail" component={this.loadables.detail} />
      </Switch>
    );
  }
}

export default Router;
