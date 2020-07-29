import { connect } from 'react-redux';
import React, { Component } from 'react';

import {
  BarChartContainer,
  KPIContainer,
  KPITodayContainer,
  LineChartContainer,
  PieChartContainer
} from '../../containers';

import * as Thunks from '../../thunks/GroupThunks';
import Header from '../../components/navigation/Header';
import Sidebar from '../../components/navigation/Sidebar';

const { Col, Grid, Row } = require('react-bootstrap');

type Props = {
  fetchData: Function;
};

class GroupView extends Component<Props> {
  constructor(props: Props) {
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
          <Header title="Groups" />
          <div className="content">
            <Grid fluid>
              <Row>
                <Col lg={3} sm={6}>
                  <KPIContainer
                    title="Total Groups"
                    statsType="groups"
                    total="total"
                    icon="pe-7s-graph1 text-danger"
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <KPITodayContainer
                    statsType="groups"
                    countData="todayCount"
                    dateData="todayDate"
                    icon="pe-7s-graph1 text-danger"
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <KPIContainer
                    title="Last Year"
                    statsType="groups"
                    total="lastYearCount"
                    icon="pe-7s-graph1 text-danger"
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <KPIContainer
                    title="Last Month"
                    statsType="groups"
                    total="lastMonthCount"
                    icon="pe-7s-users text-info"
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={4} sm={6}>
                  <LineChartContainer
                    title="Total Groups"
                    statsType="groups"
                    dataType="lastYearLineChartData"
                    xLabel="Months"
                    yLabel="Groups"
                    color="#228b22"
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <BarChartContainer
                    title="Groups Per Country"
                    statsType="groups"
                    dataType="perCountryData"
                    xLabel="Country"
                    yLabel="Groups"
                    color="#1828E8"
                    css="card-graph card-stats"
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <BarChartContainer
                    title="Groups Per NGO"
                    statsType="groups"
                    dataType="perNGOData"
                    xLabel="NGO"
                    yLabel="Groups"
                    color="#ff0000"
                    css="card-graph card-stats"
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={4} sm={6}>
                  <BarChartContainer
                    title="Groups Last Month"
                    statsType="groups"
                    dataType="lastMonthBarChartData"
                    xLabel="day"
                    yLabel="groups"
                    color="#228b22"
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <PieChartContainer
                    title="Group Size"
                    statsType="groups"
                    dataType="groupSizeStats"
                    colors={['#a4de6c', '#67b6ed', '#8884d8', '#ff0000', '#2196f3', '#228b22']}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <BarChartContainer
                    title="Groups Last Year"
                    statsType="groups"
                    dataType="lastYearBarChartData"
                    xLabel="Month"
                    yLabel="groups"
                    color="#2196f3"
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

const mapDispatchToProps = (dispatch: any) => ({
  fetchData: () => dispatch(Thunks.fetchGroupViewData())
});

export default connect(null, mapDispatchToProps)(GroupView);
