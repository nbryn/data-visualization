import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import { KPICard } from "../util/KPICard";

import TotalGraph from "../charts/graph/TotalGraph";
import SizeChart from "../charts/circle/SizeChart";

import LastMonthBar from "../charts/bar/LastMonthBar";
import LastYearBar from "../charts/bar/LastYearBar";

import { fetchMeetingStats } from "../../../redux/actions/KPI/MeetingStatsAction";
import { getCurrentTime } from "../../../util/Date";

class GroupView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      meetingTotal: "",
      meetingTotalLastUpdate: "",
      meetingsToday: "",
      meetingTodayLastUpdate: "",
      meetingMonth: "",
      meetingYear: "",
      meetingsLastMonth: "",
      meetingsLastYear: ""
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
    await this.props.fetchMeetingStats();

    const meetingStats = this.props.meetingStats;
    let lastUpdatedAt = getCurrentTime();

    let meetingMonthCount = 0;
    let meetingYearCount = 0;

    meetingStats.meetingsLastMonth.data.forEach(
      element => (meetingMonthCount += element.count)
    );
    meetingStats.meetingsLastYear.data.forEach(
      element => (meetingYearCount += element.count)
    );

    this.setState({
      meetingTotal: meetingStats.meetingTotal,
      meetingTotalLastUpdate: lastUpdatedAt,
      meetingToday:
        meetingStats.meetingsLastMonth.data[
          meetingStats.meetingsLastMonth.data.length - 1
        ].count,
      meetingTodayLastUpdate: lastUpdatedAt,
      meetingMonth: meetingMonthCount,
      meetingYear: meetingYearCount,
      meetingsLastMonth: meetingStats.meetingsLastMonth.data,
      meetingsLastYear: meetingStats.meetingsLastYear.data
    });
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <KPICard
                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                statsText="Total Meetings"
                statsValue={this.state.meetingTotal}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText={`Last Update: ${this.state.meetingTotalLastUpdate}`}
              />
            </Col>

            <Col lg={3} sm={6}>
              <KPICard
                bigIcon={<i className="pe-7s-users text-info" />}
                statsText="Meetings Today"
                statsValue={this.state.meetingsToday}
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText={`Last Update: ${this.state.meetingTodayLastUpdate}`}
              />
            </Col>
            <Col lg={3} sm={6}>
              <KPICard
                bigIcon={<i className="pe-7s-users text-info" />}
                statsText="This Month"
                statsValue={this.state.meetingMonth}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText={`Last Update: ${this.state.meetingTotalLastUpdate}`}
              />
            </Col>
            <Col lg={3} sm={6}>
              <KPICard
                bigIcon={<i className="pe-7s-users text-info" />}
                statsText="This Year"
                statsValue={this.state.meetingYear}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText={`Last Update: ${this.state.meetingTotalLastUpdate}`}
              />
            </Col>
          </Row>

          <Row>
            <Col lg={4} sm={6}></Col>
            <TotalGraph
              title="Total Meetings"
              stroke="#228b22"
              data={this.state.meetingsLastYear}
            />
            <Col lg={4} sm={6}></Col>
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
              <SizeChart />
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
    );
  }
}

const mapStateToProps = state => {
  return {
    meetingStats: state.KPI.meetingStats
  };
};

export default connect(mapStateToProps, { fetchMeetingStats })(GroupView);
