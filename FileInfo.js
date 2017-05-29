import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap';

class FileInfo extends Component {

  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(event) {
    var h = event.target.value;
    this.props.onChange(h);
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
          <input className="form-control" type="text" value={this.props.fileinfo.filename} />
        </div>
        <div className="form-group">
            <label className="control-label col-sm-10">Headers:</label>
            <textarea className="form-control" ref="headers" name="headers" onInput={this.handleInput} placeholder='Enter optional headers'/>
        </div>         
      </div>
      );
  }
}

export default FileInfo;
