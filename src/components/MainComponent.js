import React, { Component } from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import STEPS from "./optionComponent";
const theme = {
  background: "#f5f8fb",
  font: "poppins",
  headerBgColor: "#EF6C00",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#EF6C00",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
};
const config = {
  width: "50vw",
  height: "90vh",
  floating: true,
  customDelay: 2000,
  headerTitle: "Crime Regstriation",
};


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ""
    };
  }

  
  render() {
    return (
      <ThemeProvider theme={theme}>
        <ChatBot steps={STEPS} {...config} />
      </ThemeProvider>
    );
  }
}

export default Main;
