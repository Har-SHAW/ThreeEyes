import React, { Component } from "react";
import "./App.css";
import Main from "./components/MainComponent";
import Party from "./components/ParticlesReact";
class App extends Component {
  render() {
    return (
      <div style={{backgroundColor: "#282828", overflow: "hidden"}}>
        <Main />
        <Party/>
      </div>
    );
  }
}

export default App;
