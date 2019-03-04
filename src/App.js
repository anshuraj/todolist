import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import './App.css';


import SignIn from './SignIn';
import SignUp from './SignUp';
import Todo from './Todo';

import { withAuthentication, withAuthorization } from './Session';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Fragment>
          <Route exact path="/" component={Todo} />
          <Route exact path="/signin" component={SignIn} />
          <Route exact path="/signup" component={SignUp} />
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default withAuthentication(App);
