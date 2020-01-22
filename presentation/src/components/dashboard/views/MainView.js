import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import { KPICard } from "../util/KPICard";

import Sidebar from "../../navigation/Sidebar";
import Header from "../../navigation/Header";

import TotalGraph from "../charts/graph/TotalGraph";
import LastYearBar from "../charts/bar/LastYearBar";
import LastMonthBar from "../charts/bar/LastMonthBar";
import SizeChart from "../charts/circle/SizeChart";

import { fetchKeyStats } from "../../../redux/actions/kpi/KeyStatsAction";

import { getCurrentTime } from "../../../util/Date";

class MainView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userTotal: "",
      usersToday: "",
      usersLastYear: "",
      userGender: "",
      groupTotal: "",
      groupsLastMonth: "",
      groupsLastYear: "",
      meetingTotal: "",
      meetingsLastYear: "",
      shareTotal: "",
      lastUpdate: ""
    };
  }
  componentDidMount() {
    this.fetchData();

    setInterval(async () => {
      this.fetchData();
    }, 10000000);
  }

  async fetchData() {
    await this.props.fetchKeyStats();

    const stats = this.props.keyStats;

    let lastUpdatedAt = getCurrentTime();

    console.log(this.props);

    //console.log(stats.userStats.usersLastYear.data);

    this.setState({
      userTotal: stats.userStats.userCount,
      usersLastYear: stats.userStats.usersLastYear.data,
      userGender: stats.userStats.userGenderStats,
      groupTotal: stats.groupStats.groupTotal,
      groupsLastMonth: stats.groupStats.groupsLastMonth.data,
      groupsLastYear: stats.groupStats.groupsLastYear.data,
      meetingTotal: stats.meetingStats.meetingTotal,
      meetingsLastYear: stats.meetingStats.meetingsLastYear.data,
      shareTotal: stats.shareStats,
      lastUpdate: lastUpdatedAt
    });
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
                  <KPICard
                    bigIcon={<i className="pe-7s-user text-warning" />}
                    statsText="Total Users"
                    statsValue={this.state.userTotal}
                    statsIcon={<i className="fa fa-refresh" />}
                    statsIconText={`Last Update: ${this.state.lastUpdate}`}
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <KPICard
                    bigIcon={<i className="pe-7s-users text-info" />}
                    statsText="Total Groups"
                    statsValue={this.state.groupTotal}
                    statsIcon={<i className="fa fa-refresh" />}
                    statsIconText={`Last Update: ${this.state.lastUpdate}`}
                  />
                </Col>

                <Col lg={3} sm={6}>
                  <KPICard
                    bigIcon={<i className="pe-7s-graph1 text-danger" />}
                    statsText="Total Meetings"
                    statsValue={this.state.meetingTotal}
                    statsIcon={<i className="fa fa-clock-o" />}
                    statsIconText={`Last Update: ${this.state.lastUpdate}`}
                  />
                </Col>

                <Col lg={3} sm={6}>
                  <KPICard
                    bigIcon={<i className="pe-7s-wallet text-success" />}
                    statsText="Total Shares"
                    statsValue={this.state.shareTotal}
                    statsIcon={<i className="fa fa-calendar-o" />}
                    statsIconText={`Last Update: ${this.state.lastUpdate}`}
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={4} sm={6}>
                  <TotalGraph
                    title="Total Users"
                    xLabel="Months"
                    yLabel="Users"
                    stroke="#ff0000"
                    data={this.state.usersLastYear}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <TotalGraph
                    title="Total Groups"
                    xLabel="Months"
                    yLabel="Groups"
                    stroke="#228b22"
                    data={this.state.groupsLastYear}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <TotalGraph
                    title="Total Meetings"
                    xLabel="Months"
                    yLabel="Meetings"
                    stroke="#2196f3"
                    data={this.state.meetingsLastYear}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={4} sm={6}>
                  <LastMonthBar
                    title="Groups Last Month"
                    xLabel="Months"
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
                  <LastYearBar
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

const mapStateToProps = state => {
  return {
    keyStats: state.KPI.keyStats
  };
};

export default connect(mapStateToProps, {
  fetchKeyStats
})(MainView);
