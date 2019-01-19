/* eslint-disable global-require */
import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';
import { object } from 'prop-types';
import lodable from 'react-loadable';
/* Dynamically load reducer. */
import injectAsyncReducer from './injectAsyncReducer';
import sagaManager from './sagaManager';

/* Router with lazy loaded pages. */
class Router extends React.Component {
  static contextTypes = {
    store: object,
  };

  pageOptions = {
    detail: {},
    list: {
      reducer: () => require('./List/reducer').default,
      saga: () => require('./List/saga').default,
      startSaga: true,
    },
  }

  constructor(props, context) {
    super(props);

    this.createPageComponents(context);
  }

  createPageComponents(context) {
    Object.entries(this.pageOptions).forEach(([pageName, option]) => {
      const pageNameFirstLetterUpper = pageName.replace(
        pageName.slice(0, 1),
        pageName.slice(0, 1).toLocaleUpperCase(),
      );

      this[`${pageNameFirstLetterUpper}`] = lodable({
        loader: () => {
          if (option.reducer) {
            /* Asynchronously load reducer. */
            injectAsyncReducer(
              context.store,
              /* Reducer name. */
              pageName,
              /* Reducer function. */
              option.reducer(),
            );

            if (module.hot) {
              module.hot.accept(require.resolve(`./${pageNameFirstLetterUpper}/reducer`), () => {
                injectAsyncReducer(context.store, pageName, option.reducer());
              });
            }
          }

          if (option.saga) {
            /**
             * Asynchronously load saga, inject saga.
             */
            sagaManager.inject(pageName, option.saga());
            /**
             * If you take a action on multiple pages, dispatch the action on one of the pages,
             * the saga of other pages will be triggered.
             * In order to avoid that, the sagasInjector expose the sagaManager and you
             * can use it to start saga and stop saga. Refer to List/container how to do it.
             * If you control saga yourself, you can remove the following load.
             */
            option.startSaga  && sagaManager.start(pageName);
  
            if (module.hot) {
              module.hot.accept(require.resolve(`./${pageNameFirstLetterUpper}/saga`), () => {
                sagaManager.stop(pageName);
                sagaManager.inject(pageName, option.saga(), true);
                sagaManager.start(pageName);
              });
            }
          }

          return import(`./${pageNameFirstLetterUpper}`);
        },
        loading: (prop) => {
          /* If there throws error out of react component, we can only receive here */
          if (prop.error) {
            throw prop.error;
          }
          return <div>Loading...</div>;
        },
      });
    });
  }

  render() {
    return (
      <Switch>
        <Route exact path="/" component={this.List} />
        <Route exact path="/detail" component={this.Detail} />
      </Switch>
    );
  }
}

export default Router;
