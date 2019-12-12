import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import { KPICard } from "../util/KPICard";

import TotalGraph from "../charts/graph/TotalGraph";
import LastMonthBar from "../charts/bar/LastMonthBar";
import LastYearBar from "../charts/bar/LastYearBar";
import SizeChart from "../charts/circle/SizeChart";

import { fetchFinanceStats } from "../../../redux/actions/KPI/FinanceStatsAction";
import { fetchGroupStats } from "../../../redux/actions/KPI/GroupStatsAction";
import { fetchMeetingStats } from "../../../redux/actions/KPI/MeetingStatsAction";
import { fetchUserStats } from "../../../redux/actions/KPI/UserStatsAction";
import { fetchUsersLastYear } from "../../../redux/actions/KPI/UsersLastYearAction";
import { getCurrentTime } from "../../../util/Date";

class KPIView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userTotal: "",
      usersToday: "",
      usersLastYear: "",
      groupTotal: "",
      groupSize: "",
      groupsLastMonth: "",
      groupsLastYear: "",
      meetingTotal: "",
      meetingsLastMonth: "",
      meetingsLastYear: "",
      shareTotal: "",
      lastUpdate: ""
    };

    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    this.fetchData();

    setInterval(async () => {
      this.fetchData();
    }, 10000000);
  }

  async fetchData() {
    await this.props.fetchFinanceStats();
    await this.props.fetchGroupStats();
    await this.props.fetchMeetingStats();
    await this.props.fetchUserStats();
    await this.props.fetchUsersLastYear();

    const financeStats = this.props.financeStats;
    const groupStats = this.props.groupStats;
    const meetingsStats = this.props.meetingStats;
    const userStats = this.props.userStats;
    const usersLastYear = this.props.usersLastYear.signups;

    let lastUpdatedAt = getCurrentTime();

    this.setState({
      userTotal: userStats.numberOfUsers,
      userTotalLastUpdate: lastUpdatedAt,
      usersToday: userStats.signups[10].count,
      usersLastYear: usersLastYear,
      groupTotal: groupStats.groupTotal,
      groupSize: groupStats.groupSize,
      groupsLastMonth: groupStats.groupsLastMonth.data,
      groupsLastYear: groupStats.groupsLastYear.data,
      meetingTotal: meetingsStats.meetingTotal,
      meetingsLastMonth: meetingsStats.meetingsLastMonth.data,
      meetingsLastYear: meetingsStats.meetingsLastYear.data,
      shareTotal: financeStats.shareTotal,
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
                stroke="#ff0000"
                data={this.state.usersLastYear}
              />
            </Col>
            <Col lg={4} sm={6}>
              <TotalGraph
                title="Total Groups"
                stroke="#228b22"
                data={this.state.groupsLastYear}
              />
            </Col>
            <Col lg={4} sm={6}>
              <TotalGraph
                title="Total Meetings"
                stroke="#2196f3"
                data={this.state.meetingsLastYear}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={4} sm={6}>
              <LastMonthBar
                title="Groups Last Month"
                color="#228b22"
                data={this.state.groupsLastMonth}
              />
            </Col>
            <Col lg={4} sm={6}>
              <SizeChart
                title="Group Size"
                colors={[
                  "#2964d8",
                  "#67b6ed",
                  "#75ad57",
                  "#d9ae6c",
                  "#9edlel",
                  "#42cb7d"
                ]}
                data={this.state.groupSize}
              />
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
    financeStats: state.KPI.financeStats,
    groupStats: state.KPI.groupStats,
    meetingStats: state.KPI.meetingStats,
    moneyStats: state.KPI.moneyStats,
    userStats: state.KPI.userStats,
    usersLastYear: state.KPI.usersLastYear
  };
};

export default connect(mapStateToProps, {
  fetchFinanceStats,
  fetchGroupStats,
  fetchMeetingStats,
  fetchUserStats,
  fetchUsersLastYear
})(KPIView);
