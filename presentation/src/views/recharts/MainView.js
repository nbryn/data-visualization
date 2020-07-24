import { connect } from "react-redux";
import { Col, Grid, Row } from "react-bootstrap";
import React, { Component } from "react";

import BarChartContainer from "../../components/recharts/BarChartContainer";
import { fetchKeyStats } from "../../redux/actions/kpi/KeyStatsAction";
import Header from "../../components/navigation/Header";
import Sidebar from "../../components/navigation/Sidebar";
import SizeChart from "../../components/recharts/SizeChart";
import {
  MeetingTotalKPIContainer,
  GroupTotalKPIContainer,
  ShareTotalKPIContainer,
  UserTotalKPIContainer,
} from "../../containers/kpi";
import {
  MeetingTotalLineChartContainer,
  GroupTotalLineChartContainer,
  UserTotalLineChartContainer,
} from "../../containers/recharts";

class MainView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.fetchData();

    setInterval(async () => {
      this.fetchData();
    }, 10000000);
  }

  async fetchData() {
    await this.props.fetchKeyStats();

    const { keyStats } = this.props;
    const { userStats, groupStats } = keyStats;

    this.setState({
      usersLastYear: userStats.usersLastYear,
      userGender: userStats.userGenderStats,
      groupsLastMonth: groupStats.groupsLastMonth,
    });

    let count = 0;
    this.state.usersLastYear.forEach((ele) => (count += ele.count));
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
                  <BarChartContainer
                    type="Month"
                    title="Groups Last Month"
                    xLabel="Day"
                    yLabel="Groups"
                    color="#228b22"
                    data={this.state.groupsLastMonth}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <SizeChart
                    title="Gender Distribution"
                    colors={["#1828E8", "#228b22"]}
                    data={this.state.userGender}
                  />
                </Col>

                <Col lg={4} sm={6}>
                  <BarChartContainer
                    type="Year"
                    title="Users Last Year"
                    xLabel="Months"
                    yLabel="Users"
                    color="#ff0000"
                    data={this.state.usersLastYear}
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

const mapStateToProps = (state) => {
  return {
    keyStats: state.KPI.keyStats,
  };
};

export default connect(mapStateToProps, {
  fetchKeyStats,
})(MainView);
