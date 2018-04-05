import React, { Component } from 'react';
import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from 'react-bootstrap';

const PostsForm = props => (
	<Form>
		<FormGroup controlId="postcontent" className="buffer-top">
			<Col componentClass={ControlLabel} xs={12} className="buffer-top">
				Post a Message
			</Col>
			<Col xs={12}>
				<FormControl 
					componentClass="textarea"
					rows="5"
					placeholder="Post a message to this club..."
					value={props.postcontent}
					name="postcontent"
					onChange={props.handleInputChange}
				/>
			</Col>
		</FormGroup>
		<FormGroup>
			<Col xs={12} className="buffer-top buffer-bottom">
				<Button onClick={props.handleFormSubmit} className="btn btn-default btn-block btn-success">Submit Post</Button>
			</Col>
		</FormGroup>
	</Form>
);

export default PostsForm;