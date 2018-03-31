import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import Moment from 'react-moment';

import API from '../utils/API';

import './Profile.css';


class Profile extends Component {

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
      this.getUserInfo(this.state.profile.sub);
      
    }
  }

  render() {
    const { profile, user } = this.state;
    return (
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
    );
  }
}

export default Profile;