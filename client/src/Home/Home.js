import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

class Home extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
        <Grid fluid={true}>
          <Grid fluid={false}>
            <Row className="show-grid text-center">
              <Col xs={12}>
                <h1>Welcome to Base of Clubs</h1>
              </Col>
            </Row>
          </Grid>
          <Grid fluid={false}>
           { !isAuthenticated() && (
            <Row className="show-grid text-center">
              <Col xs={12} sm={6} md={4}>
                <h2>Sign up</h2>
              </Col>
              <Col xs={12} sm={6} md={4}>
                <h2>Create a Club</h2>
              </Col>
              <Col xs={12} sm={6} md={4}>
                <h2>Do Stuff</h2>
              </Col>
            </Row>
            )
            }
            {
              isAuthenticated() && (
                <Row className="show-grid text-center">
                  <Col xs={12}>
                  <h2>User is logged in, this will display</h2>
                  </Col>
                </Row>
              )
            }
          </Grid>
        </Grid>
    );
  }
}

export default Home;


// {
//           isAuthenticated() && (
//               <div>
//                 <h4>
//                   You are logged in!
//                 </h4>
//                 <Profile {...this.props} />
//               </div>
//             )
//         }
//         {
//           !isAuthenticated() && (
//               <Unauth />
//               // <h4>
//               //   You are not logged in! Please{' '}
//               //   <a
//               //     style={{ cursor: 'pointer' }}
//               //     onClick={this.login.bind(this)}
//               //   >
//               //     Log In
//               //   </a>
//               //   {' '}to continue.
//               // </h4>
//             )
//         }