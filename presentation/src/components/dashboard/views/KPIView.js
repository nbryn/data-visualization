import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import { KPICard } from "../util/KPICard";

import TotalGraph from "../charts/graph/TotalGraph";
import LastYearBar from "../charts/bar/LastYearBar";
import LastMonthBar from "../charts/bar/LastMonthBar";
import SizeChart from "../charts/circle/SizeChart";

import { fetchFinanceStats } from "../../../redux/actions/KPI/FinanceStatsAction";
import { fetchGroupStats } from "../../../redux/actions/KPI/GroupStatsAction";
import { fetchMeetingStats } from "../../../redux/actions/KPI/MeetingStatsAction";
import { fetchUserStats, fetchUsersLastYear, fetchUserGender } from "../../../redux/actions/KPI/UserStatsActions";
import { getCurrentTime } from "../../../util/Date";

class KPIView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userTotal: "",
      usersToday: "",
      usersLastYear: "",
      userGender: "",
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
    await this.props.fetchUserGender();

    const financeStats = this.props.financeStats;
    const groupStats = this.props.groupStats;
    const meetingsStats = this.props.meetingStats;
    const userStats = this.props.userStats;
    const usersLastYear = this.props.usersLastYear.data;
    const userGender = this.props.userGender;

    let lastUpdatedAt = getCurrentTime();

    this.setState({
      userTotal: userStats.numberOfUsers,
      userTotalLastUpdate: lastUpdatedAt,
      usersToday: userStats.signups[10].count,
      usersLastYear: usersLastYear,
      userGender: userGender,
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
              colors={[
                "#1828E8",
                "#ff0000",                        
              ]}
              data={this.state.userGender} />
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
    usersLastYear: state.KPI.usersLastYear,
    userGender: state.KPI.userGender
  };
};

export default connect(mapStateToProps, {
  fetchFinanceStats,
  fetchGroupStats,
  fetchMeetingStats,
  fetchUserStats,
  fetchUsersLastYear,
  fetchUserGender
})(KPIView);
