import React, { Component } from 'react';
import Unauth from './Unauth';
import Profile from '../Profile/Profile';

class Home extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        {
          isAuthenticated() && (
              <div>
                <h4>
                  You are logged in!
                </h4>
                <Profile {...this.props} />
              </div>
            )
        }
        {
          !isAuthenticated() && (
              <Unauth />
              // <h4>
              //   You are not logged in! Please{' '}
              //   <a
              //     style={{ cursor: 'pointer' }}
              //     onClick={this.login.bind(this)}
              //   >
              //     Log In
              //   </a>
              //   {' '}to continue.
              // </h4>
            )
        }
      </div>
    );
  }
}

export default Home;
