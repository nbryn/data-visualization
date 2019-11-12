import React, { Component } from "react";
import { connect } from "react-redux";

import Header from "../navigation/Header.js";
import Sidebar from "../navigation/Sidebar.js";
import KPIView from "./KPIView.js";


class DashBoard extends Component {

  render() {
    return (
      <div className="wrapper">
        <Sidebar />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header title="Dashboard" />
          <KPIView />
        </div>
      </div>
    );
  }
}


export default DashBoard;
