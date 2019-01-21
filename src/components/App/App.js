import React, { Component } from "react";
//import { css } from "@emotion/core";
import WOW from "wowjs";
import { BrowserRouter } from "react-router-dom";
import Navbar from "../../containers/Navbar/Navbar";
import Routes from "../Routes/Routes";
import "../Error/Error";
import "./App.scss";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAngleUp,
  faSlidersH,
  faSearch
} from "@fortawesome/free-solid-svg-icons";
library.add(faAngleUp, faSlidersH, faSearch);

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
