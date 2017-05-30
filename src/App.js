import React, { Component } from 'react';
import './App.css';
import FileInfo from './FileInfo';
import LogisticRegression from './LogisticRegression';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {fileinfo: {filename: '', headers: ''}};
  }
  handleFileChange(fname) {
    this.setState({ fileinfo: {filename: fname, headers: this.state.fileinfo.headers } });
  }
  handleHeaderChange(h) {
    this.setState({ fileinfo: { filename: this.state.fileinfo.filename, headers: h }});
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Machine Learning</h2>
        </div>
        <FileInfo fileinfo={this.state.fileinfo} onHeaderChange={(h) => this.handleHeaderChange(h)} onFileChange={(fname) => this.handleFileChange(fname)}/>
        <LogisticRegression fileinfo={this.state.fileinfo} />
      </div>
    );
  }
}

export default App;
