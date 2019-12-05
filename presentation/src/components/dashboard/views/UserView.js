import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";

import { KPICard } from "../util/KPICard";

import UserTotalGraph from "../charts/graph/UserTotalGraph";

import SoMeCircleChart from "../charts/circle/SoMeCircleChart";

import UsersLastMonthBar from "../charts/bar/UsersLastMonthBar";
import UsersLastYearBar from "../charts/bar/UsersLastYearBar";

import { fetchUserStats } from "../../../redux/actions/KPI/UserStatsAction";
import { getCurrentTime } from "../../../util/Date";

class KPIView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userTotal: "",
      usersTotalLastUpdate: "",
      usersToday: "",
      usersTodayLastUpdate: ""
    };
  }
  async componentDidMount() {
    // Error handling when not authenticated?
    await this.props.fetchUserStats();

    const userStats = this.props.userStats;

    let lastUpdatedAt = getCurrentTime();

    this.setState({
      userTotal: userStats.numberOfUsers,
      userTotalLastUpdate: lastUpdatedAt,
      usersToday: userStats.signups[10].count,
      usersTodayLastUpdate: lastUpdatedAt
    });

    // Reload KPI data
    setInterval(async () => {
      // Error handling when not authenticated?
      await this.props.fetchUserStats();

      const signups = this.props.userStats.signups;

      let lastUpdatedAt = getCurrentTime();

      this.setState({
        userTotal: userStats.numberOfUsers,
        userTotalLastUpdate: lastUpdatedAt,
        usersToday: signups[signups.length-1].count,
        usersTodayLastUpdate: lastUpdatedAt
      });
    }, 1000000);
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
                statsIconText={`Last Update: ${this.state.userTotalLastUpdate}`}
              />
            </Col>
            <Col lg={3} sm={6}>
              <KPICard
                bigIcon={<i className="pe-7s-user text-warning" />}
                statsText="Users Today"
                statsValue={this.state.usersToday}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText={`Last Update: ${this.state.usersTodayLastUpdate}`}
              />
            </Col>

            <Col lg={3} sm={6}>
              <KPICard
                bigIcon={<i className="pe-7s-user text-warning" />}
                statsText="This Month"
                statsValue=""
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText={`Last Update: ${this.state.usersTodayLastUpdate}`}
              />
            </Col>
            <Col lg={3} sm={6}>
              <KPICard
                bigIcon={<i className="pe-7s-user text-warning" />}
                statsText="This Year"
                statsValue=""
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText={`Last Update: ${this.state.usersTodayLastUpdate}`}
              />
            </Col>
          </Row>

          <Row>
            <Col lg={4} sm={6}>
              <UserTotalGraph />
            </Col>
          </Row>
          <Row>
            <Col lg={4} sm={6}>
              <UsersLastMonthBar />
            </Col>
            <Col lg={4} sm={6}>
              <SoMeCircleChart />
            </Col>

            <Col lg={4} sm={6}>
              <UsersLastYearBar />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userStats: state.KPI.userStats
  };
};

export default connect(mapStateToProps, { fetchUserStats })(KPIView);
