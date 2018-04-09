import React, { Component } from 'react';
import { Grid, Row, Col, Panel, ControlLabel, Glyphicon, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import Moment from 'react-moment';
import FontAwesome from 'react-fontawesome'


import API from '../utils/API';

import './Profile.css';


class Profile extends Component {

  state = {
    clubs: []
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  getUserInfo (id) {
    console.log('RA|/profile/profile.js - getting user info:',id);
    API.findUser(encodeURI(id))
    .then(res=>{
      if (res.data) {
        this.setState({user: res.data});
        this.getUserGroups(res.data._id);
        console.log(this.state);
      }
    })
  };

  getUserGroups (id) {
    console.log('RA|/profile/profile.js - getting user\'s groups:',id);
    API.findGroupByUser(id)
    .then(res=>{
      if (res.data) {
        console.log('User\'s groups found',res.data);
        this.setState({ clubs: res.data });
      } else {
        console.log('No groups found for user.')
      }
    })
  }

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
          <Grid fluid={false} className="club-bg">
            <Row className="show-grid">
              <Col xs={12} className="text-center">
                <img src={profile.picture} alt="Profile Pic" className="img-circle" />
                <h1>{user.username}</h1>
                <p>Joined Base of Clubs:&nbsp;
                      <Moment format="M/D/YYYY">
                        {user.created_at}
                      </Moment>
                      <br />
                      Last Login:&nbsp;
                      <Moment format="M/D/YYYY h:mm a">
                        {user.lastlogin_at}
                      </Moment>
                    </p>
                  {/*<pre>{JSON.stringify(profile, null, 2)}</pre>*/}
              </Col>
            </Row>
            <Row className="show-grid">
              {/*<Col xs={12} sm={6} className="bgcolor-light">
                <h2>Posts from Your Clubs</h2>
                <Panel header="Postfeed">
                  <div className="panel-heading"><strong>Username</strong> (Club Name)</div>
                  <div className="panel-body">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima, doloremque, quaerat?</p>
                  </div>
                  <div className="panel-footer small">04:30pm 2018-03-20</div>
                </Panel>
              </Col>*/}
              <Col xs={12} sm={6} smOffset={3} className="text-center">
                <hr />
                <h2>Club Memberships<br />&clubs;</h2>
                {/*<pre>{JSON.stringify(clubs,null,2)}</pre>*/}
                {this.state.clubs.length ? (
                  <ListGroup>
                    {this.state.clubs.map(club => {
                      return (
                        <ListGroupItem key={club._id} onClick={this.goTo.bind(this, 'clubs/' + club._id)}>
                          {club.groupname} <FontAwesome name="arrow-right" className="pull-right" />
                        </ListGroupItem>
                      );
                    })}
                  </ListGroup>
                ) : (
                  <p>You don't belong to any clubs yet.</p>
                )}
                <Row className="show-grid">
              <Col xs={6}><Button onClick={this.goTo.bind(this, 'newclub')} className="btn btn-primary btn-block"><FontAwesome name="plus-circle" />&nbsp;Create Club</Button></Col>
              <Col xs={6}><Button onClick={this.goTo.bind(this, 'clubs')} className="btn btn-success btn-block"><FontAwesome name="search" />&nbsp;Find a Club</Button></Col>
                </Row>
              </Col>
            </Row>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Profile;