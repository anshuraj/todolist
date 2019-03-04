import React from 'react';
import { withRouter } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import * as ROUTES from '../constants/routes';
import AuthUserContext from './context';

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null,
      };
    }

    componentDidMount() {
      // this.authListener = this.props.firebase.auth.onAuthStateChanged(
      //   authUser => {
      //     if (!condition(authUser)) {
      //       this.props.history.push(ROUTES.SIGN_IN);
      //     }
      //   }
      // );
    }

    componentWillUnmount() {
      // this.authListener();
    }

    render() {
        return (
          <AuthUserContext.Consumer>
            <Component {...this.props} />
          </AuthUserContext.Consumer>
        );
      }
    }
  
  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};

export default withAuthorization;