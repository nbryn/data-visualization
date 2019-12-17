import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";

import { KPICard } from "../util/KPICard";

import TotalGraph from "../charts/graph/TotalGraph";

import SoMeCircleChart from "../charts/circle/SoMeCircleChart";

import LastMonthBar from "../charts/bar/LastMonthBar";
import LastYearBar from "../charts/bar/LastYearBar";

import { fetchUserStats } from "../../../redux/actions/KPI/UserStatsAction";
import { fetchUsersLastYear } from "../../../redux/actions/KPI/UsersLastYearAction";
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
    await this.props.fetchUsersLastYear();

    const userStats = this.props.userStats;
    const usersLastYear = this.props.usersLastYear;

    let lastUpdatedAt = getCurrentTime();

    let userMonthCount = 0;
    let userYearCount = 0;

    userStats.signups.forEach(element => (userMonthCount += element.count));
    usersLastYear.signups.forEach(element => (userYearCount += element.count));

    this.setState({
      userTotal: userStats.numberOfUsers,
      usersToday: userStats.signups[userStats.signups.length - 1].count,
      usersTodayText: userStats.signups[userStats.signups.length - 1].day.day + "/" + userStats.signups[userStats.signups.length - 1].day.month,
      userMonth: userMonthCount,
      userYear: userYearCount,
      usersLastMonth: userStats.signups,
      usersLastYear: usersLastYear.signups,
      lastUpdate: lastUpdatedAt
    });
  }

  render() {
    return (
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
                statsText="This Month"
                statsValue={this.state.userMonth}
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText={`Last Update: ${this.state.lastUpdate}`}
              />
            </Col>
            <Col lg={3} sm={6}>
              <KPICard
                bigIcon={<i className="pe-7s-user text-warning" />}
                statsText="This Year"
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
                title="Users Last Month"
                color="#228b22"
                data={this.state.usersLastMonth}
              />
            </Col>
            <Col lg={4} sm={6}>
              <SoMeCircleChart />
            </Col>

            <Col lg={4} sm={6}>
              <LastYearBar
                title="Users Last Year"
                color="#ff0000"
                data={this.state.usersLastYear}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userStats: state.KPI.userStats,
    usersLastYear: state.KPI.usersLastYear
  };
};

export default connect(mapStateToProps, { fetchUserStats, fetchUsersLastYear })(
  KPIView
);
