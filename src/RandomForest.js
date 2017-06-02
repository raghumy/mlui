import React, { Component } from 'react';
import './App.css';
import { Button, Form, FormControl, FormGroup, Panel, Col, ControlLabel } from 'react-bootstrap';

class RandomForest extends Component {
  constructor(props) {
    super(props);
    this.state = {trainingAccuracy: '', testingAccuracy: '',  n_estimators: 10};

    this.handleEstimatorInput = this.handleEstimatorInput.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleEstimatorInput(event) {
    this.setState({n_estimators: event.target.value})
    console.log(this.state);
  }

  handleClick(i) {
    console.log('Regression button clicked');
    console.log(this.props.fileinfo);

    const formData = new FormData();
    formData.append('filename', this.props.fileinfo.filename);
    formData.append('hasHeader', this.props.fileinfo.hasHeader != null ? this.props.fileinfo.hasHeader : false);
    if (this.props.fileinfo.headers)
      formData.append('headers', this.props.fileinfo.headers);
    if (this.props.fileinfo.classLabel)
      formData.append('classLabel', this.props.fileinfo.classLabel);
    if (this.props.fileinfo.classLabelColumn)
      formData.append('classLabelColumn', this.props.fileinfo.classLabelColumn);
    formData.append('n_estimators', this.state.n_estimators);
    console.log('FormData: ' + formData);
    

    var lr = this;
    fetch('http://127.0.0.1:8080/v1/random_forest', {
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
      <Panel header="Random Forest">
        <Form>
          <FormGroup controlId="formNEstimators">
            <Col sm={2}>
              <ControlLabel>n_estimators:</ControlLabel>
            </Col>
            <Col sm={2}>
              <FormControl
                type="text"
                value={this.state.n_estimators}
                onInput={this.handleEstimatorChange}
                placeholder="n_estimators"
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formRFResults">
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
                Run Random Forest
              </Button>
            </Col>
          </FormGroup>
        </Form>
      </Panel>
    );
  }
}

export default RandomForest;
