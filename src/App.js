import React from 'react';
import { Login } from './pages/Login'
import { AuthRoute } from './AuthRoute'
import { Challenges } from './pages/Challenges'
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'

const App = () => {

  return (
    <Router>
      <Switch>
        <AuthRoute type='private' path="/challenges" render={Challenges} />
        <AuthRoute type='guest' path="/login" render={Login} />
      </Switch>
    </Router>
  );
}

export default App;