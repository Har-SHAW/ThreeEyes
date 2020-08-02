import React, { Component } from "react";
const axios = require("axios");

class AIChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      msg: "",
    };
  }

  async makeReq() {
    var params;
    if(this.props.steps.lang.value === ""){
      params = {
        sessionId: "shaw",
        queryInput: {
          text: {
            text: this.props.previousStep.value,
            languageCode: "en-US",
          },
        },
      };
    }else{
      params = {
        sessionId: "shawHindi",
        queryInput: {
          text: {
            text: this.props.previousStep.value,
            languageCode: "hi-IN",
          },
        },
      };
    }
    
    let res = await axios.post('https://us-central1-webappmedia-2aa4d.cloudfunctions.net/dialogflowGateway', params);
    // let res = await axios.post(
    //   "https://us-central1-crime-17ca7.cloudfunctions.net/dialogflowGateway",
    //   params
    // );
    console.log(res);
    console.log(this.props.steps[this.props.steps.lang.value+"Service"].value);
    this.setState({
      msg: res.data.split("^")[0],
    });

    this.props.triggerNextStep({
      trigger: res.data.split("^")[1] === undefined ? this.props.steps.lang.value+"zero" : this.props.steps.lang.value+"shaw",
      value: res.data.split("^")[1] === undefined ? "" : res.data.split("^"),
    });
  }

  componentWillMount() {
    this.makeReq();
  }

  render() {
    return (
      <div>
        {this.state.msg !== "" ? (
          <span>{this.state.msg}</span>
        ) : (
          <span>...</span>
        )}
      </div>
    );
  }
}

export default AIChat;
