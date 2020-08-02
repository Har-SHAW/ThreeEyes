import React, { Component } from "react";

import { Document, Page } from 'react-pdf';

import sample from './fraud.pdf'

class Popup extends Component {
  constructor(props){
    super(props);
    this.state = {
      mdata: []
    }
  }

  mapdata(data){
    this.setState({
      mdata: data
    })
  }

  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <div
            style={{
              paddingBottom: "10px",
              backgroundColor: "#EF6C00",
              borderRadius: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <div style={{ margin: "20px", color: "white" }}>
                Click on the places to mark them and click on the marker to remove them 
              </div>
              <button
                style={{ margin: "10px" }}
                className="button1"
                onClick={() => {
                  this.props.closePopup();
                }}
              >
                Submit
              </button>
            </div>
            <Document file={{url : "https://firebasestorage.googleapis.com/v0/b/crime-17ca7.appspot.com/o/fraud.pdf?alt=media&token=c3fa6997-2e41-4a0e-9241-f6275c6e9bfc"}}>
            
            </Document>
          </div>
        </div>
      </div>
    );
  }
}
class PopMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      disabled: false,
    };
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }
  render() {
    return (
      <div>
        <div className="app">
          <button
            className="button1"
            disabled={this.state.disabled}
            onClick={this.togglePopup.bind(this)}
          >
            Show Document
          </button>
          {this.state.showPopup ? (
            <Popup
              closePopup={this.togglePopup.bind(this)}
              next={(mdata) => {
                this.setState({
                  disabled: !this.state.disabled,
                });
                this.props.triggerNextStep({ trigger: "update", value: mdata });
              }}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default PopMain;
