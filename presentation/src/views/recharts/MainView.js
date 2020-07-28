import { connect } from 'react-redux';
import { Col, Grid, Row } from 'react-bootstrap';
import React, { Component } from 'react';

import Header from '../../components/navigation/Header';
import Sidebar from '../../components/navigation/Sidebar';
import KPIContainer from '../../containers/KPIContainer';
import {
  BarChartContainer,
  LineChartContainer,
  PieChartContainer
} from '../../containers';

import * as Thunks from '../../thunks/Thunks';

class MainView extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchData();
  }

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
                  <KPIContainer
                    title="Total Users"
                    statsType="main"
                    total="usersTotal"
                    icon="pe-7s-user text-warning"
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <KPIContainer
                    title="Total Groups"
                    statsType="main"
                    total="groupsTotal"
                    icon="pe-7s-users text-info"
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <KPIContainer
                    title="Total Meetings"
                    statsType="main"
                    total="meetingsTotal"
                    icon="pe-7s-graph1 text-danger"
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <KPIContainer
                    title="Total Shares"
                    statsType="main"
                    total="sharesTotal"
                    icon="pe-7s-graph1 text-danger"
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={4} sm={6}>
                  <LineChartContainer
                    title="Total Users"
                    statsType="main"
                    dataType="usersLastYearLineChartData"
                    xLabel="Months"
                    yLabel="Users"
                    color="#ff0000"
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <LineChartContainer
                    title="Total Groups"
                    statsType="main"
                    dataType="groupsLastYearData"
                    xLabel="Months"
                    yLabel="Groups"
                    color="#228b22"
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <LineChartContainer
                    title="Total Meetings"
                    statsType="main"
                    dataType="meetingsLastYearData"
                    xLabel="Months"
                    yLabel="Meetings"
                    color="#2196f3"
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={4} sm={6}>
                  <BarChartContainer
                    title="Groups Last Month"
                    statsType="main"
                    dataType="groupsLastMonthData"
                    xLabel="day"
                    yLabel="groups"
                    color="#228b22"
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <PieChartContainer
                    title="Gender Distribution"
                    statsType="main"
                    dataType="userGenderStats"
                    colors={['#1828E8', '#228b22']}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <BarChartContainer
                    title="Users Last Year"
                    statsType="main"
                    dataType="usersLastYearBarChartData"
                    xLabel="Months"
                    yLabel="Users"
                    color="#ff0000"
                  />
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(Thunks.fetchMainViewData())
});

export default connect(null, mapDispatchToProps)(MainView);
