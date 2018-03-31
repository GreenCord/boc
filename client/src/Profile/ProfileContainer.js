import React, { Component } from 'react';
import Profile from '../Profile/Profile';

class ProfileContainer extends Component {
  login() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return(
      <div>
        {
          isAuthenticated() && (
            <Profile {...this.props} />
          )
        }
        {
          !isAuthenticated() && (
            <h4>
              You are not logged in! Please{' '}
              <a
                style={{ cursor: 'pointer' }}
                onClick={this.login.bind(this)}
              >
                Log In
              </a>
              {' '}to continue.
            </h4>
          )
        }
      </div>
    )
  }
}

export default ProfileContainer;


// {
//         isAuthenticated() && (
//           <div>
//             <h4>
//               You are logged in!
//             </h4>
//             <Profile {...this.props} />
//           </div>
//         )
//       }
//       {
//         !isAuthenticated() && (

//          
//         )
//       }