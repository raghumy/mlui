import React, { Component } from 'react';
import './App.css';
import FileInfo from './FileInfo';
import LogisticRegression from './LogisticRegression';
import RandomForest from './RandomForest';
import SVM from './SVM';
import { Grid, PageHeader } from 'react-bootstrap';

/*
Main application
*/
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {fileinfo: {filename: '', headers: '', hasHeader: false, classLabel: '', classLabelColumn: ''}};
    console.log(this.state.fileinfo);
  }

  /*
  Handlers for various events
  */

  // Handler for File change
  handleFileChange(fname) {
    this.setState({ fileinfo: {
            filename: fname, 
            headers: this.state.fileinfo.headers,
            hasHeader: this.state.fileinfo.hasHeader,
            classLabel: this.state.fileinfo.classLabel,
            classLabelColumn: this.state.fileinfo.classLabelColumn
          } });
  }

  // Handler for Header change
  handleHeaderChange(h) {
    this.setState({ fileinfo: { 
      filename: this.state.fileinfo.filename, 
      headers: h,
      hasHeader: this.state.fileinfo.hasHeader,
      classLabel: this.state.fileinfo.classLabel,
      classLabelColumn: this.state.fileinfo.classLabelColumn
    }});
  }

  // Handler for HasHeader change
  handleHasHeaderChange(h) {
    this.setState({ fileinfo: { 
      filename: this.state.fileinfo.filename, 
      headers: this.state.fileinfo.headers,
      hasHeader: h,
      classLabel: this.state.fileinfo.classLabel,
      classLabelColumn: this.state.fileinfo.classLabelColumn
    }});
  }

  // Handler for Class Label change
  handleClassLabelChange(h) {
    this.setState({ fileinfo: { 
      filename: this.state.fileinfo.filename, 
      headers: this.state.fileinfo.headers,
      hasHeader: this.state.fileinfo.hasHeader,
      classLabel: h,
      classLabelColumn: this.state.fileinfo.classLabelColumn
    }});
  }

  // Handler for Class Label Column change
  handleClassLabelColumnChange(h) {
    this.setState({ fileinfo: { 
      filename: this.state.fileinfo.filename, 
      headers: this.state.fileinfo.headers,
      hasHeader: this.state.fileinfo.hasHeader,
      classLabel: this.state.fileinfo.classLabel,
      classLabelColumn: h
    }});
  }

  render() {
    return (
      <Grid>
        <PageHeader>Machine Learning</PageHeader>
        
        <FileInfo fileinfo={this.state.fileinfo} 
          onHeaderChange={(h) => this.handleHeaderChange(h)} 
          onFileChange={(fname) => this.handleFileChange(fname)}
          onHasHeaderChange={(h) => this.handleHasHeaderChange(h)}
          onClassLabelChange={(h) => this.handleClassLabelChange(h)}
          onClassLabelColumnChange={(h) => this.handleClassLabelColumnChange(h)}/>
        <LogisticRegression fileinfo={this.state.fileinfo} />
        <RandomForest fileinfo={this.state.fileinfo} />
        <SVM fileinfo={this.state.fileinfo} />
      </Grid>
    );
  }
}

export default App;
