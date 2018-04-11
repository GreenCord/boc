import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Grid, Row, Col, Button, Panel } from 'react-bootstrap';
import API from '../utils/API';

import FontAwesome from 'react-fontawesome';

class ShowClub extends Component {
	state = {
		groups: [],
		loadmsg: 'Loading groups...'
	};
  
	componentDidMount() {
		this.loadGroups();
	}

	getUserInfo (id) {
    console.log('RA|/Club/ShowClub.js - getting user info:',id);
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
        if(profile){
        	this.getUserInfo(profile.sub);
        }
      });

    } else {
      this.setState({ profile: userProfile });
      console.log('Profile component will mount, else statement');
      this.getUserInfo(userProfile.sub);
      // console.log('Else statement - check state',this.state.profile);
      
    }
  };

	loadGroups = (id) => {
		API.findGroups(id)
		.then(groups=>{
			this.setState({groups: groups.data, loadmsg: 'No groups found.'});
			console.log('Showing state after finding groups:',this.state);
		});
	}

	isMember = (arr,id) => {
		if (arr.indexOf(id) === -1) {
			return false;
		} else {
			return true;
		}
	}

	handleViewClick = id => {
		console.log('Clicked - view club: ',id);
		this.props.history.replace(`/clubs/${id}`);
	}

	handleJoinClick = (id,uid) => {
		console.log('Clicked - join club: ',id,'User:',uid);
		API.joinGroup(id,uid)
		.then(joined=>{
			console.log('User joined group',joined);
			this.props.history.replace(`/clubs/${id}`);
		})
	}

	render() {
		const { isAuthenticated } = this.props.auth;
		const { user } = this.state;
		return (
			<Grid fluid={true}>
				<Grid fluid={false}>
					<Row className="show-grid">
						<Col xs={12} className="text-center">
							<h1>&clubs;&nbsp;List of Clubs&nbsp;&clubs;</h1>
							<hr />
						</Col>
					</Row>
					<Row className="show-grid">
						{this.state.groups.length ? (
							<div>
								{this.state.groups.map(group=>(
									<Col xs={12} md={6} lg={6} key={group._id}>
										<Panel>
												<div className="panel-heading">
													<h2><FontAwesome name="users" />&nbsp;{group.groupname}</h2>
												</div>
												<div className="panel-body">
													<p>{group.description}</p>
													<p>Members: {group.member.length} {/*(debug: {group.member[0]})*/}</p>
												</div>
												<div className="panel-footer">
													<Row>
													<Col xs={6}>
														<Button className="btn btn-primary btn-block" onClick={() => this.handleViewClick(group._id)}>View Club</Button>
													</Col>
													{
														isAuthenticated() && (
															<Col xs={6}>
																{
																	group.member.indexOf(user._id) === -1 && 
																	<Button className="btn btn-default btn-block" onClick={() => this.handleJoinClick(group._id,user._id)}>Join Club</Button>
																}
															</Col>
														)
													}
													</Row>
												</div>
										</Panel>
									</Col>
								))}
							</div>
						) : (
							<Col xs={12}>
								<h2>{this.state.loadmsg}</h2>
							</Col>
						)}
					</Row>
				</Grid>
			</Grid>
		)
	};
}

export default ShowClub;
