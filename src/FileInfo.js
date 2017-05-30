import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';

class FileInfo extends Component {

  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log("Handle Change")
    console.log(event.target.files[0])
    const formData = new FormData();
    formData.append('upfile', event.target.files[0])
    console.log('-->', formData);

    this.setState({ message: 'Uploading file' });
    var fname = event.target.value;
    if (fname)
      fname = fname.replace(/^.*(\\|\/|\:)/, '')
    this.props.onFileChange(fname);

    fetch('http://127.0.0.1:8080/v1/upload', {
      method: 'POST', 
      mode: 'no-cors',
      body: formData, 
      }).then(response => {
        console.log(response);
        this.setState({ message: 'File Uploaded' });
        
      })
        .then(json => console.log(json));  
  }

  handleInput(event) {
    var h = event.target.value;
    this.props.onHeaderChange(h);
  }

  render() {
    const options = {
      baseUrl: 'http://127.0.0.1:8080/v1'
    } 
  
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h1 className="panel-title clearfix">File Info</h1>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-10">File Name:</label>
          <div className="form-inline">
            <input className="form-control" id="upload-input" type="text" value={this.props.fileinfo.filename} />
            <label className="btn btn-primary" id="upload-label">
                Upload File    
              <input ref="upfile" id="upfile" name="upfile" type="file" style={{display: 'none'}} onChange={this.handleChange}/>
            </label>
            </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-10">Headers:</label>
          <textarea className="form-control" id="headers" ref="headers" name="headers" onInput={this.handleInput} placeholder='Enter optional headers'/>
        </div>         
      </div>
      );
  }
}

export default FileInfo;
