import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import { KPICard } from "../util/KPICard";

import TotalGraph from "../charts/graph/TotalGraph";

import SoMeCircleChart from "../charts/circle/SoMeCircleChart";
import GroupSizeChart from "../charts/circle/GroupSizeChart";

import LastMonthBar from "../charts/bar/LastMonthBar";
import LastYearBar from "../charts/bar/LastYearBar";

import { fetchUserStats } from "../../../redux/actions/KPI/UserStatsAction";
import { fetchGroupStats } from "../../../redux/actions/KPI/GroupStatsAction";
import { fetchMeetingStats } from "../../../redux/actions/KPI/MeetingStatsAction";
import { fetchUsersLastYear } from "../../../redux/actions/KPI/UsersLastYearAction";
import { getCurrentTime } from "../../../util/Date";

class KPIView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userTotal: "",
      usersTotalLastUpdate: "",
      usersToday: "",
      usersTodayLastUpdate: "",
      usersLastYear: "",
      groupTotal: "",
      groupTotalLastUpdate: "",
      groupsLastMonth: "",
      groupsLastYear: "",
      meetingTotal: "",
      meetingTotalLastUpdate: "",
      meetingsLastMonth: "",
      meetingsLastYear: "",
      $Total: ""
    };

    this.fetchData = this.fetchData.bind(this);
  }
  async componentDidMount() {
    // Error handling when not authenticated?
    this.fetchData();

    // Reload KPI data
    setInterval(async () => {
      // Error handling when not authenticated?
      this.fetchData();
    }, 1000000);
  }

  async fetchData() {
    await this.props.fetchUserStats();
    await this.props.fetchUsersLastYear();
    await this.props.fetchGroupStats();
    await this.props.fetchMeetingStats();

    const userStats = this.props.userStats;
    const usersLastYear = this.props.usersLastYear.signups;
    const groupStats = this.props.groupStats;
    const meetingsStats = this.props.meetingStats;

    let lastUpdatedAt = getCurrentTime();

    this.setState({
      userTotal: userStats.numberOfUsers,
      userTotalLastUpdate: lastUpdatedAt,
      usersToday: userStats.signups[10].count,
      usersTodayLastUpdate: lastUpdatedAt,
      usersLastYear: usersLastYear,
      groupTotal: groupStats.groupTotal,
      groupTotalLastUpdate: lastUpdatedAt,
      groupsLastMonth: groupStats.groupsLastMonth.data,
      groupsLastYear: groupStats.groupsLastYear.data,
      meetingTotal: meetingsStats.meetingTotal,
      meetingTotalLastUpdate: lastUpdatedAt,
      meetingsLastMonth: meetingsStats.meetingsLastMonth.data,
      meetingsLastYear: meetingsStats.meetingsLastYear.data
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
              <TotalGraph title="Total Users" stroke="#ff0000" signups={this.state.usersLastYear}/>
            </Col>
            <Col lg={4} sm={6}>
              <TotalGraph title="Total Groups" stroke="#228b22" signups={this.state.groupsLastYear} />
            </Col>
            <Col lg={4} sm={6}>
              <TotalGraph title="Total Meetings" stroke="#2196f3" signups={this.state.meetingsLastYear}/>
            </Col>
          </Row>
          <Row>
            <Col lg={4} sm={6}>
              <LastMonthBar title="Groups Last Month" signups={this.state.groupsLastMonth} />
            </Col>
            <Col lg={4} sm={6}>
              <SoMeCircleChart />
            </Col>

            <Col lg={4} sm={6}>
              <LastYearBar title="Users Last Year" signups={this.state.usersLastYear} />
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
    usersLastYear: state.KPI.usersLastYear,
    groupStats: state.KPI.groupStats,
    meetingStats: state.KPI.meetingStats
  };
};

export default connect(mapStateToProps, {
  fetchUserStats, fetchUsersLastYear,
  fetchGroupStats,
  fetchMeetingStats
})(KPIView);
