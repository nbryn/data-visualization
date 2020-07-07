import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import { KPICard } from "../components/dashboard/common/KPICard";

import Sidebar from "../components/navigation/Sidebar";
import Header from "../components/navigation/Header";

import TotalGraph from "../components/dashboard/charts/graph/TotalGraph";
import SizeChart from "../components/dashboard/charts/circle/SizeChart";
import LastMonthBar from "../components/dashboard/charts/bar/LastMonthBar";
import LastYearBar from "../components/dashboard/charts/bar/LastYearBar";

import { fetchUserStats } from "../redux/actions/kpi/UserStatsAction";
import { fetchGeneralCountryStats } from "../redux/actions/country/GeneralCountryStatsAction";
import {fetchNGOStats} from "../redux/actions/ngo/NGOStatsAction";


import { getCurrentTime } from "../util/Date";
import TopBar from "../components/dashboard/charts/bar/TopBar";

class UserView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  async componentDidMount() {
    this.fetchData();

    setInterval(async () => {
      this.fetchData();
    }, 1000000);
  }

  async fetchData() {
    await this.props.fetchUserStats();
    await this.props.fetchNGOStats();
    await this.props.fetchGeneralCountryStats();

    const userStats = this.props.userStats;

    let lastUpdatedAt = getCurrentTime();

    let userMonthCount = 0;
    let userYearCount = 0;

    userStats.usersLastMonth.data.forEach(
      (element) => (userMonthCount += element.count)
    );
    userStats.usersLastYear.data.forEach(
      (element) => (userYearCount += element.count)
    );

    this.setState({
      userTotal: userStats.userCount,
      usersToday:
        userStats.usersLastMonth.data[userStats.usersLastMonth.data.length - 1]
          .count,
      usersTodayText:
        userStats.usersLastMonth.data[userStats.usersLastMonth.data.length - 1]
          .day.day +
        "/" +
        userStats.usersLastMonth.data[userStats.usersLastMonth.data.length - 1]
          .day.month,
      userMonth: userMonthCount,
      userYear: userYearCount,
      usersLastMonth: userStats.usersLastMonth.data,
      usersLastYear: userStats.usersLastYear.data,
      userGender: userStats.userGenderStats,
      usersCountry: this.props.usersCountry,
      usersNGO: this.props.usersNGO,
      lastUpdate: lastUpdatedAt,
    });
  }

  render() {
    const KPICards = {
      userTotal: { text: "Total Users", icon: "pe-7s-user text-warning" },
      usersToday: {
        text: `Users ${this.state.usersTodayText}`,
        icon: "pe-7s-users text-info",
      },
      userMonth: {
        text: "Last Month",
        icon: "pe-7s-graph1 text-danger",
      },
      userYear: { text: "Last Year", icon: "pe-7s-wallet text-success" },
    };
    return (
      <div className="wrapper">
        <Sidebar />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header title="Users" />
          <div className="content">
            <Grid fluid>
              <Row>
                {Object.keys(KPICards).map((element, index) => (
                  <Col lg={3} sm={6}>
                    <KPICard
                      bigIcon={<i className={KPICards[element].icon} />}
                      statsText={KPICards[element].text}
                      statsValue={this.state[element]}
                      statsIcon={<i className="fa fa-refresh" />}
                      statsIconText={`Last Update: ${this.state.lastUpdate}`}
                    />
                  </Col>
                ))}
              </Row>

              <Row>
                <Col lg={4} sm={6}>
                  <TotalGraph
                    title="Total Users"
                    stroke="#ff0000"
                    data={this.state.usersLastYear}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <TopBar
                    title="Users Per Country"
                    color="#1828E8"
                    xLabel="Country"
                    yLabel="Users"
                    data={this.state.usersCountry}
                    css="card-graph card-stats"
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <TopBar
                    title="Users Per NGO"
                    color="#1828E8"
                    xLabel="NGO"
                    yLabel="Users"
                    data={this.state.usersNGO}
                    css="card-graph card-stats"
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={4} sm={6}>
                  <LastMonthBar
                    title="Users Per Day"
                    xLabel="Day"
                    yLabel="Users"
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
                    xLabel="Month"
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
    userStats: state.KPI.userStats,
    usersCountry: state.country.usersCountry,
    usersNGO: state.NGO.usersNGO
  };
};

export default connect(mapStateToProps, {
  fetchUserStats,
  fetchGeneralCountryStats,
  fetchNGOStats
})(UserView);
