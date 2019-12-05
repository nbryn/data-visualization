import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";

import { KPICard } from "../util/KPICard";

import GroupTotalGraph from "../charts/graph/GroupTotalGraph";
import MoneyTotalGraph from "../charts/graph/MoneyTotalGraph";
import UserTotalGraph from "../charts/graph/UserTotalGraph";

import SoMeCircleChart from "../charts/circle/SoMeCircleChart";
import GroupSizeChart from "../charts/circle/GroupSizeChart";

import UsersLastMonthBar from "../charts/bar/UsersLastMonthBar";
import UsersLastYearBar from "../charts/bar/UsersLastYearBar";

import { fetchUserStats } from "../../../redux/actions/KPI/UserStatsAction";
import { fetchGroupTotal } from "../../../redux/actions/KPI/GroupTotalAction";
import { fetchMeetingTotal } from "../../../redux/actions/KPI/MeetingTotalAction";
import { getCurrentTime } from "../../../util/Date";

class KPIView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userTotal: "",
      usersTotalLastUpdate: "",
      usersToday: "",
      usersTodayLastUpdate: "",
      groupTotal: "",
      groupTotalLastUpdate: "",
      meetingTotal: "",
      meetingTotalLastUpdate: "",
      $Total: ""
    };
  }
  async componentDidMount() {
    // Error handling when not authenticated?
    await this.props.fetchUserStats();
    await this.props.fetchGroupTotal();
    await this.props.fetchMeetingTotal();

    const userStats = this.props.userStats;
    const groupTotal = this.props.groupTotal;
    const meetingTotal = this.props.meetingTotal;

    let lastUpdatedAt = getCurrentTime();

    this.setState({
      userTotal: userStats.numberOfUsers,
      userTotalLastUpdate: lastUpdatedAt,
      usersToday: userStats.signups[10].count,
      usersTodayLastUpdate: lastUpdatedAt,
      groupTotal: groupTotal,
      groupTotalLastUpdate: lastUpdatedAt,
      meetingTotal: meetingTotal,
      meetingTotalLastUpdate: lastUpdatedAt
    });

    // Reload KPI data
    setInterval(async () => {
      // Error handling when not authenticated?
      await this.props.fetchUserStats();
      await this.props.fetchGroupTotal();
      await this.props.fetchMeetingTotal();

      const userStats = this.props.userStats;
      const groupTotal = this.props.groupTotal;
      const meetingTotal = this.props.meetingTotal;

      let lastUpdatedAt = getCurrentTime();

      this.setState({
        userTotal: userStats.numberOfUsers,
        userTotalLastUpdate: lastUpdatedAt,
        usersToday: userStats.signups[10].count,
        usersTodayLastUpdate: lastUpdatedAt,
        groupTotal: groupTotal,
        groupTotalLastUpdate: lastUpdatedAt,
        meetingTotal: meetingTotal,
        meetingTotalLastUpdate: lastUpdatedAt
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
                bigIcon={<i className="pe-7s-users text-info" />}
                statsText="Total Groups"
                statsValue={this.state.groupTotal}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText={`Last Update: ${this.state.groupTotalLastUpdate}`}
              />
            </Col>

            <Col lg={3} sm={6}>
              <KPICard
                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                statsText="Total Meetings"
                statsValue={this.state.meetingTotal}
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText={`Last Update: ${this.state.meetingTotalLastUpdate}`}
              />
            </Col>

            <Col lg={3} sm={6}>
              <KPICard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Amount Registered"
                statsValue="$5,345"
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Last day"
              />
            </Col>
          </Row>

          <Row>
            <Col lg={4} sm={6}>
              <UserTotalGraph />
            </Col>
            <Col lg={4} sm={6}>
              <GroupTotalGraph />
            </Col>
            <Col lg={4} sm={6}>
              <MoneyTotalGraph />
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
    userStats: state.KPI.userStats,
    groupTotal: state.KPI.groupTotal,
    meetingTotal: state.KPI.meetingTotal
  };
};

export default connect(mapStateToProps, {
  fetchUserStats,
  fetchGroupTotal,
  fetchMeetingTotal
})(KPIView);
