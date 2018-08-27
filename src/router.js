import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import dynamic from 'dva/dynamic';
import routes from './routes'

function RouterConfig({ history, app }) {
  return (
    <Router history={history}>
      <Switch>
      {
        routes.map(({ path, exact, ...dynamics }, key) => (
          <Route key={key}
            exact={exact || false}
            path={path}
            component={dynamic({
              app,
              ...dynamics,
            })}
          />
        ))
      }
      </Switch>
    </Router>
  );
}

export default RouterConfig;
