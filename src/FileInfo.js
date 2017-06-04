import React, { Component } from 'react';
import './App.css';
import { Checkbox, Col, Form, FormGroup, FormControl, ControlLabel, Panel } from 'react-bootstrap';

/*
This class handles all of the File Info interaction
The state for this component is passed in as a parameter. When an event occurs, it handles it
and calls the appropriate handler.
*/
class FileInfo extends Component {

  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleHasHeader = this.handleHasHeader.bind(this);
    this.handleClassLabel = this.handleClassLabel.bind(this);
    this.handleClassLabelColumn = this.handleClassLabelColumn.bind(this);
    this.handleFileNameChange = this.handleFileNameChange.bind(this);
  }

  /*
  This class handles the Upload File button
  */
  handleChange(event) {
    console.log("Handle Change")
    console.log(event.target.files[0])
    const formData = new FormData();
    formData.append('upfile', event.target.files[0])
    console.log('-->', formData);

    this.setState({ message: 'Uploading file' });

    // Extract the file name and store it in the field
    // TODO: Handle validation of file name
    var fname = event.target.value;
    if (fname)
      fname = fname.replace(/^.*(\\|\/|\:)/, '');
    this.props.onFileChange(fname);

    // Call the webservice to store the file
    // TODO: Handle errors when file upload fails
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

  handleHasHeader(event) {
    var h = event.target.checked;
    console.log('Has header ' + h);
    this.props.onHasHeaderChange(h);
    console.log('handleHasHeader ' + h);
  }

  handleClassLabel(event) {
    var h = event.target.value;
    this.props.onClassLabelChange(h);
  }

  handleClassLabelColumn(event) {
    var h = event.target.value;
    this.props.onClassLabelColumnChange(h);
  }

  handleFileNameChange(event) {
    var h = event.target.value;
    this.props.onFileChange(h);
  }

  render() {
    return (
      <Panel header="File Info">
        <Form horizontal>
          <FormGroup controlId="formFileName">
            <Col sm={2}>
              <ControlLabel>File Name:</ControlLabel>
            </Col>
            <Col sm={4}>
              <FormControl
                type="text"
                value={this.props.fileinfo.filename}
                onInput={this.handleFileNameChange}
                placeholder="Filename"
              />
            </Col>
            <Col sm={2}>
              <label className="btn btn-primary" id="upload-label">
                  Upload File    
                <input ref="upfile" 
                  id="upfile" 
                  name="upfile" 
                  type="file" 
                  style={{display: 'none'}} 
                  onChange={this.handleChange}/>
              </label>
            </Col>
          </FormGroup>
          <FormGroup>
            <Col sm={2} smOffset={2}>
              <Checkbox checked={this.props.fileinfo.hasHeader} onChange={this.handleHasHeader}>Has Header</Checkbox>
            </Col>
          </FormGroup>
          { !this.props.fileinfo.hasHeader &&
            <FormGroup controlId="formHeaders">
              <Col sm={2}>
                <ControlLabel>Header:</ControlLabel>
              </Col>
              <Col sm={4}>
                <FormControl componentClass="textarea" placeholder="Headers" 
                  value={this.props.fileinfo.headers}
                  onInput={this.handleInput}/>
              </Col>
            </FormGroup>
          }
          <FormGroup controlId="formClassLabel">
            <Col sm={2}>
              <ControlLabel>Class Label:</ControlLabel>
            </Col>
            <Col sm={4}>
              <FormControl
                type="text"
                value={this.props.fileinfo.classLabel}
                placeholder="Class Label"
                onInput={this.handleClassLabel}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="formClassLabel">
            <Col sm={2}>
              <ControlLabel>Class Label Column:</ControlLabel>
            </Col>
            <Col sm={4}>
              <FormControl
                type="text"
                value={this.props.fileinfo.classLabelColumn}
                placeholder="Class Label Column"
                onInput={this.handleClassLabelColumn}
              />
            </Col>
          </FormGroup>
        </Form>        
      </Panel>
      );
  }
}

export default FileInfo;
