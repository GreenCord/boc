import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import "./Home.css";
import FontAwesome from 'react-fontawesome';

class Home extends Component {
  login() {
    this.props.auth.login();
  }
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
        <div>
          <Grid fluid={true} className="bgcolor-light">
            <Grid fluid={false}>
              <Row className="show-grid text-center">
                <Col xs={12}>
                  <hr />
                  <h1>&clubs;<br />Welcome to Base of Clubs</h1>
                  <hr />
                </Col>
              </Row>
            </Grid>
          </Grid>

           
            <Grid fluid={true}>
            <Grid fluid={true} className="banner home_banner_1">
            <Grid fluid={true} className="home_banner_2">
            <Grid fluid={false}>
            <Row className="show-grid text-center">
              
              <Col xs={12} sm={4}>
                <FontAwesome 
                  name="sign-in" 
                  size="5x"
                />
                <h2>Sign up</h2>
              </Col>
              <Col xs={12} sm={4}>
                <FontAwesome 
                  name="users" 
                  size="5x"
                />
                <h2>Create a Club</h2>
              </Col>
              <Col xs={12} sm={4}>
                <FontAwesome 
                  name="cogs" 
                  size="5x"
                />
                <h2>Do Stuff</h2>
              </Col>
            </Row>
            <Row className="show-grid text-center">
              <Col xs={12}>
                { !isAuthenticated() && (
                  <Button
                    className="btn btn-primary"
                    style={{ cursor: 'pointer' }}
                    onClick={this.login.bind(this)}
                  >
                  Create an Account to Begin
                </Button>
                )}
                { isAuthenticated() && (
                  <Button
                    className="btn btn-primary"
                    style={{ cursor: 'pointer'}}
                    onClick={this.goTo.bind(this, 'newclub')}
                  >
                  Create a Club
                  </Button>
                )}
              </Col>
            </Row>
            </Grid></Grid></Grid>
            <Grid fluid={true} className="banner home_banner_3">
            <Grid fluid={true} className="home_banner_4">
            <Grid fluid={false}>
              <Row className="show-grid text-left">
              
              <Col xs={8} xsOffset={2}>
                <h3>How it Works</h3>
                <p>If you manage a club, group, or organization, you know how difficult it can be to keep all of your members on the same page.</p>
                <p>With Base of Clubs, you and your members can join in an online space to share plans, ideas, or whatever makes your club work.</p>
                <hr />
                <h4>Features</h4>
                <Row>
                  <Col xs={12} sm={6}>
                    <h5>Free Tier</h5>
                    <ul>
                      <li>Personal account</li>
                      <li>Create a club</li>
                      <li>Post Messages</li>
                    </ul>
                  </Col>
                  <Col xs={12} sm={6}>
                    <h5>Coming Soon</h5>
                    <ul>
                      <li>Club Dues &ndash; Members pay dues according to your schedule</li>
                      <li>Private Clubs and Member Invitations</li>
                      <li>Comment on Messages</li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
            </Grid>
          </Grid>
        </Grid>
        </Grid>
        </div>
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

// { !isAuthenticated() && (
//             )
//             }
//             {
//               isAuthenticated() && (
//                 <Row className="show-grid text-center">
//                   <Col xs={12}>
//                   <h2>User is logged in, this will display</h2>
//                   </Col>
//                 </Row>
//               )
//             }