import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
// import Moment from 'react-moment';

import CreateClubForm from './CreateClubForm';

import API from '../utils/API';



class CreateClub extends Component {
  state = {
    groupname: '',
    description: ''
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    // console.log('InputChange Test:',name,value);
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    let info = {
      _id: this.state.user._id,
      groupname: this.state.groupname,
      description: this.state.description
    }
    console.log('Unimplemented: Form submit with data - ',info);
    API.createGroup(info)
    .then(res=>{
      console.log('API call complete to create group:',res);
    })
    .catch(err=>console.log(err))
  };

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
      console.log('Createclub component will mount, if statement');
      getProfile((err, profile) => {
        this.setState({ profile });
        this.getUserInfo(profile.sub);
      });

    } else {
      console.log('Createclub component will mount, else statement');
      this.setState({ profile: userProfile });
      this.getUserInfo(userProfile.sub);
    }
  };

  handleClick_createClub() {
    alert('Unimplemented: Go to create a club page.');
  };

  render() {
    const { profile, user } = this.state;
    // const { profile, user } = this.state;
    // console.log('CreateClub:', this.state);
    return (
      <Grid fluid={true}>
        <Grid fluid={false}>

          <Row className="show-grid">
            <Col xs={12} className="text-center">
              <h1>Create a New Club</h1>
            </Col>
          </Row>

          <Row className="show-grid">
            <Col xs={12} sm={10} md={6} smOffset={1} mdOffset={3} className="bgcolor-light">
              <p></p>
              <CreateClubForm 
                _id={user._id}
                groupname={this.state.groupname}
                description={this.state.description}
                handleFormSubmit={this.handleFormSubmit}
                handleInputChange={this.handleInputChange}
                profile={profile}
                {...this.props}
              />
            </Col>
          </Row>
          
        </Grid>
      </Grid>
    );
  }
}

export default CreateClub;