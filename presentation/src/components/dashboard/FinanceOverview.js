import React, { Component } from "react";
import Header from "../navigation/Header.js";
import Sidebar from "../navigation/Sidebar.js";
import FinanceView from "./views/FinanceView";

class FinanceOverview extends Component {

  render() {
    return (
      <div className="wrapper">
        <Sidebar />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header title="Finance" />
          <FinanceView />
        </div>
      </div>
    );
  }
}


export default FinanceOverview;