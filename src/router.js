import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import lodable from 'react-loadable';

/**
 * Return router
 * @return {Router}
 */
export default class Router extends React.Component {
  /**
   * @param  {Object} props
   */
  constructor(props) {
    super(props);

    this.ListPage = lodable({
      loader: () => {
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

  /**
   * @return {Component}
   */
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={this.ListPage} />
          <Route exact path="/detail" component={this.DetailPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}
