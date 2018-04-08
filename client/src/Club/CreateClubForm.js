 import React from 'react';
 import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from 'react-bootstrap';




const CreateClubForm = props => (
    <Form>
        
      <FormGroup controlId="groupname">
        <Col componentClass={ControlLabel} xs={12}>
          Club Name {/*(debug for {props._id})*/}
        </Col>
        <Col xs={12}>
          <FormControl 
            type="text" 
            placeholder="Enter club name..."
            value={props.groupname}
            name="groupname"
            onChange={props.handleInputChange}
          />
        </Col>
      </FormGroup>

      <FormGroup controlId="description" className="buffer-top">
        <Col componentClass={ControlLabel} xs={12} className="buffer-top">
          Club Description
        </Col>
        <Col xs={12}>
          <FormControl 
            componentClass="textarea"
            rows="5"
            placeholder="Enter description of club..."
            value={props.description}
            name="description"
            onChange={props.handleInputChange}
          />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col xs={12} className="buffer-top buffer-bottom">
          <Button onClick={props.handleFormSubmit} className="btn btn-default btn-block btn-success">Create Club</Button>
        </Col>
      </FormGroup>
  
    </Form>
);

export default CreateClubForm;
