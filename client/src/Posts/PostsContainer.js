import React, { Component } from 'react';
import { Panel, Col } from 'react-bootstrap';
import API from '../utils/API';

class PostsContainer extends Component {
	state = {
		posts: [],
	};

	componentWillMount(){
		// this.fetchClubPosts(this.props.gid);
	}

	render() {
		return (
			<Col xs={12}>
				{this.props.posts ? (
					<div>
						<h2>Group Newsfeed</h2>
						{this.props.posts.map(post=>{
							return (
							<Panel header="Postfeed" key={post._id}>
							 	<div className="panel-heading"><strong>{post.author_id.username}</strong></div>
							 	<div className="panel-body">
							 		<p>{post.content}</p>
					      </div>
					      <div className="panel-footer small">{post.updated_at_formatted}</div>
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