import React, { Component } from "react";

import Header from "../navigation/Header.js";
import Sidebar from "../navigation/Sidebar.js";
import MeetingView from "./views/MeetingView";


class Meetingboard extends Component {

  render() {
    return (
      <div className="wrapper">
        <Sidebar />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header title="Meetings" />
          <MeetingView />
        </div>
      </div>
    );
  }
}


export default Meetingboard;