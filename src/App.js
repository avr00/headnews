import React, { Component } from "react";
//import { css } from "@emotion/core";
import WOW from "wowjs";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Routes from "./components/Routes/Routes";
import "./components/Error/Error";
import "./App.scss";


// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;

class App extends Component {
  componentDidMount() {
    new WOW.WOW().init();
  }
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Routes />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
