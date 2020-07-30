import React, { Component } from "react";
import "./App.css";
import Main from "./components/MainComponent";
import Search from './components/searchdrop'
class App extends Component {
  render() {
    return (
      <div>
        <Main />
        <Search/>
      </div>
    );
  }
}

export default App;
