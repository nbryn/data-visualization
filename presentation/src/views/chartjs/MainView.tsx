import { Col, Row } from "react-bootstrap";
import React, { Component } from "react";

import Header from "../../components/navigation/Header";
import Sidebar from "../../components/navigation/Sidebar";
import UsersTotalContainer from "../../containers/chartjs/UsersTotalContainer";

class MainView extends Component {
  render() {
    return (
      <div className="wrapper">
        <Sidebar />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header title="Chartjs Dashboard" />
          <div className="content">
            <div className="container">
              <Row>
                <Col lg={3} sm={6}>
                  <div className="chartjs-main">
                    <UsersTotalContainer />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MainView;
