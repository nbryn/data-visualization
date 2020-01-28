import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import { KPICard } from "../util/KPICard";

import Sidebar from "../../navigation/Sidebar";
import Header from "../../navigation/Header";

import TotalGraph from "../charts/graph/TotalGraph";

import LastMonthBar from "../charts/bar/LastMonthBar";
import LastYearBar from "../charts/bar/LastYearBar";

import { fetchMeetingStats } from "../../../redux/actions/kpi/MeetingStatsAction";
import { getCurrentTime } from "../../../util/Date";

class GroupView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      meetingTotal: "",
      meetingsToday: "",
      meetingsTodayText: "",
      meetingMonth: "",
      meetingYear: "",
      meetingsLastMonth: "",
      meetingsLastYear: "",
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
    await this.props.fetchMeetingStats();

    console.log(this.props);

    const meetingStats = this.props.meetingStats;
    const lastMonth = meetingStats.meetingsLastMonth.data;
    let lastUpdatedAt = getCurrentTime();

    let meetingMonthCount = 0;
    let meetingYearCount = 0;

    lastMonth.forEach(element => (meetingMonthCount += element.count));
    meetingStats.meetingsLastYear.data.forEach(
      element => (meetingYearCount += element.count)
    );

    this.setState({
      meetingTotal: meetingStats.meetingTotal,
      meetingsToday: lastMonth[lastMonth.length - 1].count,
      meetingsTodayText:
        lastMonth[lastMonth.length - 1].day.day +
        "/" +
        lastMonth[lastMonth.length - 1].day.month,
      meetingMonth: meetingMonthCount,
      meetingYear: meetingYearCount,
      meetingsLastMonth: lastMonth,
      meetingsLastYear: meetingStats.meetingsLastYear.data,
      lastUpdate: lastUpdatedAt
    });
  }

  render() {
    return (
      <div className="wrapper">
      <Sidebar />
      <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header title="Meetings" />
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <KPICard
                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                statsText="Total Meetings"
                statsValue={this.state.meetingTotal}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText={`Last Update: ${this.state.lastUpdate}`}
              />
            </Col>

            <Col lg={3} sm={6}>
              <KPICard
                bigIcon={<i className="pe-7s-users text-info" />}
                statsText={"Meetings " + this.state.meetingsTodayText}
                statsValue={this.state.meetingsToday}
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText={`Last Update: ${this.state.lastUpdate}`}
              />
            </Col>
            <Col lg={3} sm={6}>
              <KPICard
                bigIcon={<i className="pe-7s-users text-info" />}
                statsText="Last Month"
                statsValue={this.state.meetingMonth}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText={`Last Update: ${this.state.lastUpdate}`}
              />
            </Col>
            <Col lg={3} sm={6}>
              <KPICard
                bigIcon={<i className="pe-7s-users text-info" />}
                statsText="Last Year"
                statsValue={this.state.meetingYear}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText={`Last Update: ${this.state.lastUpdate}`}
              />
            </Col>
          </Row>

          <Row>
            <Col lg={4} sm={6}>
              <TotalGraph
                title="Total Meetings"
                stroke="#228b22"
                data={this.state.meetingsLastYear}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={4} sm={6}>
              <LastMonthBar
                title="Meetings Last Month"
                color="#228b22"
                data={this.state.meetingsLastMonth}
              />
            </Col>

            <Col lg={4} sm={6}>
              <LastYearBar
                title="Meetings Last Year"
                color="#ff0000"
                data={this.state.meetingsLastYear}
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
    meetingStats: state.KPI.meetingStats
  };
};

export default connect(mapStateToProps, { fetchMeetingStats })(GroupView);
