import React, { Component } from 'react';
import { Panel, Col } from 'react-bootstrap';

class PostsContainer extends Component {
	state = {
		posts: [],
	};

	componentWillMount(){
		this.fetchClubPosts(this.props.gid);
	}

	fetchClubPosts = (id) => {
		console.log('UNIMPLEMENTED - RA|/Posts/PostsContainer - finding posts for group id',id);
	}

	render() {
		return (
			<Col xs={12}>
				{this.state.posts.length ? (
					<div>
						{this.state.posts.map(post=>{
							return (
							<Panel header="Postfeed" key={post._id}>
							 	<div className="panel-heading"><strong>Username</strong></div>
							 	<div className="panel-body">
							 		<p>post content</p>
					      </div>
					      <div className="panel-footer small">04:30pm 2018-03-20</div>
					    </Panel>
					    );
						})}
					</div>
					) : (
					<p>No posts in this group yet.</p>
					)
				}
		
	    </Col>
		)
	}
}

export default PostsContainer;