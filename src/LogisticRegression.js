import React, { Component } from 'react';
import './App.css';
import { Button, Form, FormControl, FormGroup, Panel, Row, Col, ControlLabel } from 'react-bootstrap';

/*
Class that handles Logistic Regression
*/
class LogisticRegression extends Component {
  constructor(props) {
    super(props);
    this.state = {trainingAccuracy: '', testingAccuracy: '',  penalty: 'l2', C: 0.1 };

    this.handleChange = this.handleChange.bind(this);
    this.handleCChange = this.handleCChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // Handle change in penalty value
  handleChange(event) {
    this.setState({penalty: event.target.value})
    console.log(this.state);
  }

  // Handle change in C value
  handleCChange(event) {
    this.setState({C: event.target.value})
    console.log(this.state);
  }

  // Handle pressing the button to run Logistic Regression
  handleClick(i) {
    console.log('Regression button clicked');
    console.log(this.props.fileinfo);

    // Gather form parameters
    const formData = new FormData();
    formData.append('filename', this.props.fileinfo.filename);
    formData.append('hasHeader', this.props.fileinfo.hasHeader != null ? this.props.fileinfo.hasHeader : false);
    if (this.props.fileinfo.headers)
      formData.append('headers', this.props.fileinfo.headers);
    formData.append('penalty', this.state.penalty);
    if (this.state.C)
      formData.append('C', this.state.C);
    if (this.props.fileinfo.classLabel)
      formData.append('classLabel', this.props.fileinfo.classLabel);
    if (this.props.fileinfo.classLabelColumn)
      formData.append('classLabelColumn', this.props.fileinfo.classLabelColumn);
    console.log('FormData: ' + formData);
    

    // Call the webservice to run regression
    // On success store the accuracy results
    // TODO: Handler error conditions
    var lr = this;
    fetch('http://127.0.0.1:8080/v1/logistic_regression', {
      method: 'POST', 
      //mode: 'cors',
      body: formData, 
    }).then(function(response) { return response.json(); })
    .then(function(data) {
      console.log(data);
      lr.setState({trainingAccuracy: data.train_accuracy.toFixed(5), testingAccuracy: data.test_accuracy.toFixed(5)});
    });
  }

  render() {
    return (
      <Panel header="Logistic Regression" bsStyle="warning">
        <Form horizontal>
          <FormGroup controlId="formRegularization">
            <Col sm={2}>
              <ControlLabel>Regularization:</ControlLabel>
            </Col>
            <Col sm={2}>
              <FormControl componentClass="select" 
                value={this.state.penalty} 
                onChange={this.handleChange} >
                <option value="l2">l2 regularization</option>
                <option value="l1">l1 regularization</option>
              </FormControl>
            </Col>
            <Col sm={2}>
              <ControlLabel>C:</ControlLabel>
            </Col>
            <Col sm={2}>
              <FormControl
                type="text"
                value={this.state.C}
                placeholder="Class Label Column"
                onInput={this.handleCChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formLRResults">
            <Col sm={2}>
              <ControlLabel>Training Accuracy:</ControlLabel>
            </Col>
            <Col sm={2}>
              <label className="testResult">{this.state.trainingAccuracy}</label>
            </Col>
            <Col sm={2}>
              <ControlLabel>Testing Accuracy:</ControlLabel>
            </Col>
            <Col sm={2}>
              <label className="testResult">{this.state.testingAccuracy}</label>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={12}>
              <Button onClick={() => this.handleClick()}>
                Run Logistic Regression
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Panel>
    );
  }
}

export default LogisticRegression;
