import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';

class LogisticRegression extends Component {
  constructor(props) {
    super(props);
    this.state = {trainingAccuracy: '', testingAccuracy: ''};

    //this.handleChange = this.handleChange.bind(this);
    //this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i) {
    console.log('Regression button clicked');
    console.log(this.props.fileinfo);

    const formData = new FormData();
    formData.append('filename', this.props.fileinfo.filename);
    formData.append('headers', this.props.fileinfo.headers);

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
      <div className="panel panel-default">
        <div className="panel-heading">
          <h1 className="panel-title clearfix">LogisticRegression</h1>
        </div>
        <div>
          <div className="form-group">
            <label className="control-label">Training Accuracy:</label>
            <label>{this.state.trainingAccuracy}</label>
          </div>
          <div className="form-group">
            <label className="control-label">Testing Accuracy:</label>
            <label>{this.state.testingAccuracy}</label>
          </div>
        </div>
        <Button onClick={() => this.handleClick()}>
        Run Regression
        </Button>
      </div>
    );
  }
}

export default LogisticRegression;
