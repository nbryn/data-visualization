import { connect } from 'react-redux';
import { Col, Grid, Row,  } from 'react-bootstrap';
import React, { Component } from 'react';

import Header from '../../components/navigation/Header';
import Sidebar from '../../components/navigation/Sidebar';

import * as Thunks from '../../thunks/Thunks';

import KPITodayContainer from '../../containers/KPITodayContainer';
import KPIContainer from '../../containers/KPIContainer';

import { BarChartContainer, LineChartContainer } from '../../containers';

class MeetingView extends Component {
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
          <Header title="Meetings" />
          <div className="content">
            <Grid fluid>
              <Row>
                <Col lg={3} sm={6}>
                  <KPIContainer
                    title="Total Meetings"
                    statsType="meetings"
                    total="totalData"
                    icon="pe-7s-user text-warning"
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <KPITodayContainer
                    statsType="meetings"
                    countData="todayCount"
                    dateData="todayDate"
                    icon="pe-7s-users text-info"
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <KPIContainer
                    title="Last Month"
                    statsType="meetings"
                    total="lastMonthCount"
                    icon="pe-7s-graph1 text-danger"
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <KPIContainer
                    title="Last Year"
                    statsType="meetings"
                    total="lastYearCount"
                    icon="pe-7s-wallet text-success"
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={4} sm={6}>
                  <LineChartContainer
                    title="Total Meetings"
                    statsType="meetings"
                    dataType="lastYearData"
                    xLabel="Months"
                    yLabel="Meetings"
                    color="#228b22"
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <BarChartContainer
                    title="Meetings Per Group"
                    statsType="meetings"
                    dataType="perGroupData"
                    xLabel="Group"
                    yLabel="Meetings"
                    color="#ff0000"
                    css="card-graph card-stats"
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <BarChartContainer
                    title="Meetings Per Country"
                    statsType="meetings"
                    dataType="perCountryData"
                    xLabel="Country"
                    yLabel="Meetings"
                    color="#228b22"
                    css="card-graph card-stats"
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={4} sm={6}>
                  <BarChartContainer
                    title="Meetings Last Month"
                    statsType="meetings"
                    dataType="lastMonthBarChartData"
                    xLabel="Day"
                    yLabel="Meetings"
                    color="#1828E8"
                  />
                </Col>

                <Col lg={4} sm={6}>
                  <BarChartContainer
                    title="Meetings Last Year"
                    statsType="meetings"
                    dataType="lastYearBarChartData"
                    xLabel="Month"
                    yLabel="Meetings"
                    color="#8918E8"
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <BarChartContainer
                    title="Meetings With Most Shares"
                    statsType="meetings"
                    dataType="sharesPerMeetingData"
                    xLabel="Meeting"
                    yLabel="Shares"
                    color="#2196f3"
                    css="card-circle card-stats"
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
  fetchData: () => dispatch(Thunks.fetchMeetingViewData())
});

export default connect(null, mapDispatchToProps)(MeetingView);
