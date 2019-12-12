import React, { Component } from "react";

import Header from "../navigation/Header.js";
import Sidebar from "../navigation/Sidebar.js";
import GroupView from "./views/GroupView";


class GroupOverview extends Component {

  render() {
    return (
      <div className="wrapper">
        <Sidebar />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header title="Groups" />
          <GroupView />
        </div>
      </div>
    );
  }
}


export default GroupOverview;