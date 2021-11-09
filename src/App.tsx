import * as React from 'react';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import store from '../src/app/store';
import Login from './components/views/auth/Login';
import Layout from './components/views/layout/Layout'

import './App.css';


function App() {
  return (
    <Provider store={store}>
  <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route  path='/admin' component={Layout} />
        </Switch>
      </div>
  </Router>
  </Provider>
      
  );
}

export default App;
