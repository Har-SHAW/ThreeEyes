import React, { Component } from "react";
import { Document, Page } from "react-pdf/dist/entry.webpack";
import sample from "./fraud.pdf";

class Pdf extends Component {
  state = { numPages: null, pageNumber: 1 };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () =>
    this.setState((state) => ({ pageNumber: state.pageNumber - 1 }));
  goToNextPage = () =>
    this.setState((state) => ({ pageNumber: state.pageNumber + 1 }));

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <nav>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
            }}
          >
          </div>
        </nav>

        <div>
          <Document file={sample} onLoadSuccess={this.onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} width={450}/>
          </Document>
        </div>

        {/* <p>
          Page {pageNumber} of {numPages}
        </p> */}
      </div>
    );
  }
}

class Popup extends Component {
  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <div
            style={{
              backgroundColor: "transparent",
              width: "100%",
            }}
          >
            <button
                className="button1"
                onClick={() => {
                  this.props.closePopup();
                }}
              >
                close
              </button>

            <Pdf />
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
            Show Map
          </button>
          {this.state.showPopup ? (
            <Popup closePopup={this.togglePopup.bind(this)} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default PopMain;
