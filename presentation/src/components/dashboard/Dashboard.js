import React, { Component } from "react";

import Header from "../navigation/Header.js";
import Sidebar from "../navigation/Sidebar.js";
import KPIView from "./views/KPIView";


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
