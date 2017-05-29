import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';

class UploadForm extends Component {

  constructor(props) {
    super(props);
    this.state = {filename: '', message: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    var fname = event.target.value;
    if (fname)
      fname = fname.replace(/^.*(\\|\/|\:)/, '')
    this.setState({ filename: fname, message: '' });
    this.props.onChange(fname);
  }

  handleSubmit(event) {
    event.preventDefault();

    console.log("Handle Submit")
    console.log(event.data)
    const formData = new FormData();
    for (const field in this.refs) {
      if (this.refs[field].type === "file")
        formData.append(field, this.refs[field].files[0]);
      else
        formData.append(field, this.refs[field].value);
    }
    console.log('-->', formData);
    this.setState({ message: 'Uploading file' });
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

  render() {
    const options = {
      baseUrl: 'http://127.0.0.1:8080/v1'
    } 
  
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h1 className="panel-title clearfix">File Upload</h1>
        </div>
        <div className="container">
          <form onSubmit={this.handleSubmit}> 
            <div className="form-group">
              <label className="control-label col-sm-10">File Name:</label>
              <div className="form-group">
                <div className="col-sm-12">
                  <input id="fileSelect" type="text" className="col-sm-8 custom-border" value={this.state.filename} placeholder='Select a file' />
                  <label className="btn btn-primary">
                        Browse
                        <input ref="upfile" id="upfile" name="upfile" type="file" 
                          style={{display: 'none'}} onChange={this.handleChange}/>
                  </label>
                </div>
              </div>
            </div>
            <div className="form-group">
                <label className="control-label col-sm-10">Headers: </label>
                <textarea className="form-control" ref="headers" name="headers" placeholder='Enter optional headers'/>
            </div>         
            <div className="form-group">
              <Button type="submit">
                Upload File
              </Button>
            </div>
          </form>
          <div className="result">{ this.state.message }</div>
        </div>
      </div>
      );
  }
}

export default UploadForm;
