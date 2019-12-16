import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Profile from './containers/Profile';

const App: React.FC = () => {
  return (
    <main className="App">
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/:id" component={Profile} />
        </Switch>
      </Router>
    </main>
  );
};

export default App;
