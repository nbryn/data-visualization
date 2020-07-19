import { connect } from "react-redux";
import { Col, Grid, Row } from "react-bootstrap";
import React, { Component } from "react";

import BarChartContainer from "../../components/recharts/BarChartContainer";
import { fetchUserStats } from "../../redux/actions/kpi/UserActions";
import { fetchGeneralCountryStats } from "../../redux/actions/country/GeneralCountryStatsAction";
import { fetchNGOStats } from "../../redux/actions/ngo/NGOStatsAction";
import { getCurrentTime } from "../../util/Date";
import Header from "../../components/navigation/Header";
import { KPICard } from "../../components/kpi/KPICard";
import Sidebar from "../../components/navigation/Sidebar";
import SizeChart from "../../components/recharts/SizeChart";
import LineChartContainer from "../../components/recharts/LineChartContainer";

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

    const { usersCountry, usersNGO, userStats } = this.props;

    const {
      usersLastMonth,
      usersLastYear,
      userGenderStats,
      userCount,
    } = userStats;

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
      userTotal: userCount,
      usersToday: usersLastMonth[usersLastMonth.length - 1].count,
      usersTodayText:
        usersLastMonth[usersLastMonth.length - 1].day.day +
        "/" +
        usersLastMonth[usersLastMonth.length - 1].day.month,
      userMonth: userMonthCount,
      userYear: userYearCount,
      usersLastMonth: usersLastMonth,
      usersLastYear: usersLastYear,
      userGender: userGenderStats,
      usersCountry: usersCountry,
      usersNGO: usersNGO,
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
                  <Col lg={3} sm={6} key={index}>
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
                  <LineChartContainer
                    title="Total Users"
                    stroke="#ff0000"
                    data={this.state.usersLastYear}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <BarChartContainer
                    type="Top"
                    title="Users Per Country"
                    color="#1828E8"
                    xLabel="Country"
                    yLabel="Users"
                    data={this.state.usersCountry}
                    css="card-graph card-stats"
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <BarChartContainer
                    type="Top"
                    title="Users Per NGO"
                    color="#2196f3"
                    xLabel="NGO"
                    yLabel="Users"
                    data={this.state.usersNGO}
                    css="card-graph card-stats"
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={4} sm={6}>
                  <BarChartContainer
                    type="Month"
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
                  <BarChartContainer
                    type="Year"
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
    usersNGO: state.NGO.usersNGO,
  };
};

export default connect(mapStateToProps, {
  fetchUserStats,
  fetchGeneralCountryStats,
  fetchNGOStats,
})(UserView);
