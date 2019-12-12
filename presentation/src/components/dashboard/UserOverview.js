import React, { Component } from "react";

import Header from "../navigation/Header.js";
import Sidebar from "../navigation/Sidebar.js";
import UserView from "./views/UserView";


class UserOverview extends Component {

  render() {
    return (
      <div className="wrapper">
        <Sidebar />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header title="Users" />
          <UserView />
        </div>
      </div>
    );
  }
}


export default UserOverview;