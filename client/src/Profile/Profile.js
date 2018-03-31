import React, { Component } from 'react';
import { Grid, Row, Col, Panel, ControlLabel, Glyphicon, Button } from 'react-bootstrap';
import Moment from 'react-moment';


import API from '../utils/API';

import './Profile.css';


class Profile extends Component {

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  getUserInfo (id) {
    console.log('RA|/profile/profile.js - getting user info:',id);
    API.findUser(encodeURI(id))
    .then(res=>{
      if (res.data) {
        this.setState({user: res.data});
        console.log(this.state);
      }
    })
  };

  componentWillMount() {
    this.setState({ 
      profile: {},
      user: {}
    });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      console.log('Profile component will mount, if statement');
      getProfile((err, profile) => {
        this.setState({ profile });
        this.getUserInfo(profile.sub);
      });

    } else {
      this.setState({ profile: userProfile });
      console.log('Profile component will mount, else statement');
      this.getUserInfo(userProfile.sub);
      // console.log('Else statement - check state',this.state.profile);
      
    }
  };

  handleClick_createClub() {
    alert('Unimplemented: Go to create a club page.');
  };

  render() {
    const { profile, user } = this.state;
    return (
      <div>
        <Grid fluid={true}>
          <Grid fluid={false}>
            <Row className="show-grid">
              <Col xs={12} className="text-center">
                <img src={profile.picture} alt="Profile Pic" className="img-circle" />
                <h1>{user.username}</h1>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col xs={12} sm={6} className="bgcolor-light">
                <h2>Posts from Your Clubs</h2>
                <Panel header="Postfeed">
                  <div className="panel-heading"><strong>Username</strong> (Club Name)</div>
                  <div className="panel-body">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, doloremque, quaerat?</p>
                  </div>
                  <div className="panel-footer small">04:30pm 2018-03-20</div>
                </Panel>
              </Col>
              <Col xs={12} sm={6}>
                <h2>Club Membership</h2>
                <div className="list-group">
                  <a className="list-group-item" href="/">Club Name Here</a>
                  <a className="list-group-item" href="/">Club Name Here</a>
                  <a className="list-group-item" href="/">Club Name Here</a>
                  <a className="list-group-item" href="/">Club Name Here</a>
                </div>
                <Row className="show-grid">
              <Col xs={6}><Button onClick={this.goTo.bind(this, 'newclub')} className="btn btn-primary btn-block">Create Club</Button></Col>
              <Col xs={6}><Button className="btn btn-success btn-block">Find a Club</Button></Col>
                </Row>
              </Col>
            </Row>
          </Grid>
        </Grid>
        <div className="container">
          <div className="profile-area">
            <h2>{profile.name}</h2>
            <Panel header="Profile">
              <img src={profile.picture} alt="profile" />
              <div>
                <ControlLabel><Glyphicon glyph="user" /> {user.username}</ControlLabel>
                <h3>{profile.nickname}</h3>
                <p>
                  Joined Base of Clubs:&nbsp;
                  <Moment format="M/d/YYYY">
                    {user.created_at_formatted}
                  </Moment>
                </p>
                <p>
                  Last Login:&nbsp;
                  <Moment format="M/d/YYYY h:mm a">
                    {user.lastlogin_at_formatted}
                  </Moment>
                </p>
              </div>
              <pre>{JSON.stringify(profile, null, 2)}</pre>
            </Panel>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;