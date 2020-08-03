import React, { Component } from "react";
import "./App.css";
import Main from "./components/MainComponent";
//import Party from "./components/ParticlesReact";
import HomePage from "./components/HomePage";
import getMac from 'getmac'
const os = require('os')
const axios  = require('axios');

class App extends Component {

  componentDidMount(){
  }

  onClick(){
    axios.get('https://api.ipify.org/?format=json').then((res)=>{
      console.log(res.data.ip);
    }).catch((err)=>{
      console.log(err)
    })
  }
  

  render() {
    
    return (
      <div
        style={{
          backgroundColor: "white",
          height: "100vh",
          width: "100vw",
          overflow: "hidden",
        }}
      >
        <Main />
        {/*<Party />*/}
        <div style={{ position: "absolute", top: "0", left: "0" }}>
          <HomePage />
          <button onClick={()=>{this.onClick()}}>getIp</button>
        </div>
      </div>
    );
  }
}

export default App;
