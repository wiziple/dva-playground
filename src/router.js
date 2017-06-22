import React from 'react';
import { Router, Route, IndexRoute } from 'dva/router';
import App from './containers/App';

import Users from './containers/Users';
import Posts from './containers/Posts';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Posts} />
        <Route path="/posts" component={Posts} />
        <Route path="/users" component={Users} />
      </Route>
    </Router>
  );
}

export default RouterConfig;
