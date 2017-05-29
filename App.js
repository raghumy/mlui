import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';
import UploadForm from './UploadForm';
import FileInfo from './FileInfo';
import LogisticRegression from './LogisticRegression';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {fileinfo: {filename: '', headers: ''}};
  }
  handleFileChange(fname) {
    this.setState({ fileinfo: {filename: fname } });
  }
  handleHeaderChange(h) {
    this.setState({ fileinfo: { headers: h }});
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Machine Learning</h2>
        </div>
        <UploadForm fileinfo={this.state.fileinfo} onChange={(fname) => this.handleFileChange(fname)}/>
        <FileInfo fileinfo={this.state.fileinfo} onChange={(h) => this.handleHeaderChange(h)}/>
        <LogisticRegression fileinfo={this.state.fileinfo} />
      </div>
    );
  }
}

export default App;
