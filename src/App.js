import React, { Component } from "react";
import "./App.css";
import Main from "./components/MainComponent";
class App extends Component {
  render() {
    console.log(""+Date().toString()+"");
    return (
      <div>
        <Main />
      </div>
    );
  }
}

export default App;
