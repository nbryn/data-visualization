import { Col, Grid, Row } from "react-bootstrap";
import React, { Component } from "react";

import Header from "../../components/navigation/Header";
import Sidebar from "../../components/navigation/Sidebar";
import {
  MeetingTotalKPIContainer,
  GroupTotalKPIContainer,
  ShareTotalKPIContainer,
  UserTotalKPIContainer,
} from "../../containers/kpi";
import {
  MeetingTotalLineChartContainer,
  GroupLastMonthBarChartContainer,
  GroupTotalLineChartContainer,
  UserGenderPieChartContainer,
  UserLastYearBarChartContainer,
  UserTotalLineChartContainer,
} from "../../containers/recharts";

class MainView extends Component {
  render() {
    return (
      <div className="wrapper">
        <Sidebar />

        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header title="Dashboard" />
          <div className="content">
            <Grid fluid>
              <Row>
                <Col lg={3} sm={6}>
                  <UserTotalKPIContainer />
                </Col>
                <Col lg={3} sm={6}>
                  <GroupTotalKPIContainer />
                </Col>
                <Col lg={3} sm={6}>
                  <MeetingTotalKPIContainer />
                </Col>
                <Col lg={3} sm={6}>
                  <ShareTotalKPIContainer />
                </Col>
              </Row>

              <Row>
                <Col lg={4} sm={6}>
                  <UserTotalLineChartContainer />
                </Col>
                <Col lg={4} sm={6}>
                  <GroupTotalLineChartContainer />
                </Col>
                <Col lg={4} sm={6}>
                  <MeetingTotalLineChartContainer />
                </Col>
              </Row>

              <Row>
                <Col lg={4} sm={6}>
                  <GroupLastMonthBarChartContainer />
                </Col>
                <Col lg={4} sm={6}>
                  <UserGenderPieChartContainer />
                </Col>
                <Col lg={4} sm={6}>
                  <UserLastYearBarChartContainer />
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default MainView;
