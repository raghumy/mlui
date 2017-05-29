import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import UploadForm from './UploadForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {filename: ''};
  }
  handleChange(fname) {
    this.setState({ filename: fname });
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Machine Learning</h2>
        </div>
        <UploadForm onChange={(fname) => this.handleChange(fname)}/>
      </div>
    );
  }
}

export default App;
