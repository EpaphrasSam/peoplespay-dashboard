import * as React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import Login from './components/views/auth/Login';
import Layout from './components/views/layout/Layout'

import './App.css';


function App() {
  return (
  <Router>
      <div className='App'>
        <Switch>
          
          <Route exact path='/' component={Login} />
          <Route  path='/admin' component={Layout} />
        </Switch>
      </div>
  </Router>
      
  );
}

export default App;
