import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import history from './history';
import Poll from './pages/Poll';
import Administrator from './pages/Administrator';


const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/poll/:id" exact component={Poll} />
            <Route path="/admin" exact component={Administrator} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
