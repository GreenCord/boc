import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Grid, Row, Col, Button } from 'react-bootstrap';
import PostsContainer from '../Posts/PostsContainer';
import PostsForm from '../Posts/PostsForm';
import API from '../utils/API';

class ClubContainer extends Component {
	state = {
		clubinfo: [],
		postcontent: '',
		posts: []
	};

	getUserInfo (id) {
    // console.log('RA|/profile/profile.js - getting user info:',id);
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
      // console.log('Createclub component will mount, if statement');
      getProfile((err, profile) => {
        this.setState({ profile });
        this.getUserInfo(profile.sub);
      });

    } else {
      // console.log('Createclub component will mount, else statement');
      this.setState({ profile: userProfile });
      this.getUserInfo(userProfile.sub);
    }
  };
  
	componentDidMount() {
		this.fetchClubInfo(this.props.match.params.id);
	}

	fetchClubInfo = (id) => {
		API.findGroups(id)
		.then(groups=>{
			console.log('Found club info:',groups);
			this.setState({
				clubinfo: groups.data
			});
			console.log('Showing state after finding groups:',this.state);
			console.log('Get posts');
			this.fetchClubPosts(id);
			// if (this.state.posts.length > 0) {

			// }
		});
	}

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
		console.log('Testing:',this.state.postcontent);
	};

	handleFormSubmit = event => {
		event.preventDefault();
		let info = {
			author_id: this.state.user._id,
			group_id: this.props.match.params.id,
			content: this.state.postcontent
		};
		console.log('Post Form Submitted, submitting:',info.content,' from user: ',info.author_id, ' to group: ', info.group_id);
		API.createPost(info)
		.then(res=> {
			console.log('API call complete to create post:',res);
			this.setState({postcontent: ''});
			this.fetchClubInfo(info.group_id);
			this.fetchClubPosts(info.group_id);
		})
	}

	fetchClubPosts = (id) => {
		console.log('UNIMPLEMENTED - RA|/Posts/PostsContainer - finding posts for group id',id);
		API.findPosts(id)
		.then(res=>{
			this.setState({posts: res.data});
			console.log('Testing found posts',res.data);
			console.log('Testing state:',this.state.posts);
		});
	}

	// handleViewClick = id => {
	// 	console.log('Clicked - view club: ',id);
	// 	this.props.history.replace(`/clubs/${id}`);
	// }

	render() {
		const { clubinfo, profile, user } = this.state;
		return (
			<Grid fluid={true}>
				<Grid fluid={false}>
					<Row className="show-grid">
						<Col xs={12}>
							<h1>{clubinfo.groupname}</h1>
							<p>{clubinfo.description}</p>
							<p>Debug: GroupID - {this.props.match.params.id}</p>
						</Col>
					</Row>
					<hr />
					<Row className="show-grid">
						<Col xs={12}><h2>Club Members</h2></Col>
					</Row>
					<Row className="show-grid">
						{this.state.clubinfo.member ? (
							<div>
								{this.state.clubinfo.member.map(mem=>(
									<Col xs={12} md={6} lg={4} key={mem._id}>
										<h3>{mem.username}</h3>
									</Col>
								))}
							</div>
						) : (
							<Col xs={12}>
								<h2>{this.state.loadmsg}</h2>
							</Col>
						)}
					</Row>
					<hr />
					<Row>
						<PostsContainer 
						  auth={this.auth} 
						  gid={this.props.match.params.id} 
						  posts={this.state.posts}
						  fetchClubPosts={this.fetchClubPosts} 
						 />
					</Row>
					<Row>
					<Col xs={9}>
						<PostsForm 
							auth={this.auth} 
							gid={this.props.match.params.id} 
							postcontent={this.state.postcontent} 
							handleInputChange={this.handleInputChange}
							handleFormSubmit={this.handleFormSubmit}
							profile={profile}
							user={user}
							{...this.props}
						/>
					</Col>
					</Row>
				</Grid>
			</Grid>
		)
	};
}

export default ClubContainer;
