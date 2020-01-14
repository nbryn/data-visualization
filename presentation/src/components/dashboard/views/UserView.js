import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import { KPICard } from "../util/KPICard";

import Sidebar from "../../navigation/Sidebar";
import Header from "../../navigation/Header";

import TotalGraph from "../charts/graph/TotalGraph";
import SizeChart from "../charts/circle/SizeChart";
import LastMonthBar from "../charts/bar/LastMonthBar";
import LastYearBar from "../charts/bar/LastYearBar";

import { fetchUserStats } from "../../../redux/actions/kpi/UserStatsActions";
import { getCurrentTime } from "../../../util/Date";

class KPIView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userTotal: "",
      usersToday: "",
      usersTodayText: "",
      userMonth: "",
      userYear: "",
      usersLastMonth: "",
      usersLastYear: "",
      userGender: "",
      lastUpdate: ""
    };
  }
  async componentDidMount() {
    this.fetchData();

    setInterval(async () => {
      this.fetchData();
    }, 1000000);
  }

  async fetchData() {
    await this.props.fetchUserStats();

    const userStats = this.props.userStats;

    let lastUpdatedAt = getCurrentTime();

    let userMonthCount = 0;
    let userYearCount = 0;

    userStats.usersLastMonth.data.forEach(element => (userMonthCount += element.count));
    userStats.usersLastYear.data.forEach(element => (userYearCount += element.count));

    this.setState({
      userTotal: userStats.userCount,
      usersToday: userStats.usersLastMonth.data[userStats.usersLastMonth.data.length - 1].count,
      usersTodayText:
        userStats.usersLastMonth.data[userStats.usersLastMonth.data.length - 1].day.day +
        "/" +
        userStats.usersLastMonth.data[userStats.usersLastMonth.data.length - 1].day.month,
      userMonth: userMonthCount,
      userYear: userYearCount,
      usersLastMonth: userStats.usersLastMonth.data,
      usersLastYear: userStats.usersLastYear.data,
      userGender: userStats.userGenderStats,
      lastUpdate: lastUpdatedAt
    });
  }

  render() {
    return (
      <div className="wrapper">
        <Sidebar />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header title="Users" />
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
                    bigIcon={<i className="pe-7s-user text-warning" />}
                    statsText={"Users " + this.state.usersTodayText}
                    statsValue={this.state.usersToday}
                    statsIcon={<i className="fa fa-refresh" />}
                    statsIconText={`Last Update: ${this.state.lastUpdate}`}
                  />
                </Col>

                <Col lg={3} sm={6}>
                  <KPICard
                    bigIcon={<i className="pe-7s-user text-warning" />}
                    statsText="Last Month"
                    statsValue={this.state.userMonth}
                    statsIcon={<i className="fa fa-calendar-o" />}
                    statsIconText={`Last Update: ${this.state.lastUpdate}`}
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <KPICard
                    bigIcon={<i className="pe-7s-user text-warning" />}
                    statsText="Last Year"
                    statsValue={this.state.userTotal}
                    statsIcon={<i className="fa fa-clock-o" />}
                    statsIconText={`Last Update: ${this.state.lastUpdate}`}
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={4} sm={6}>
                  <TotalGraph
                    title="Total Users"
                    stroke="#ff0000"
                    data={this.state.usersLastYear}
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={4} sm={6}>
                  <LastMonthBar
                    title="Users Per Day"
                    color="#228b22"
                    data={this.state.usersLastMonth}
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
                    title="Users Per Month"
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
    userStats: state.KPI.userStats
  };
};

export default connect(mapStateToProps, {
  fetchUserStats
})(KPIView);
