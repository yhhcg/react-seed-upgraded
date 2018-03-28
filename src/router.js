import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';

import ListPage from './List';
import DetailPage from './Detail';

/**
 * Return router
 * @return {Router}
 */
export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ListPage} />
        <Route exact path="/detail" component={DetailPage} />
      </Switch>
    </BrowserRouter>
  );
}
