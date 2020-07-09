import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import { KPICard } from "../../components/dashboard/common/KPICard";

import Sidebar from "../../components/navigation/Sidebar";
import Header from "../../components/navigation/Header";

import TotalGraph from "../../components/dashboard/charts/graph/TotalGraph";

import TopBar from "../../components/dashboard/charts/bar/TopBar";
import LastMonthBar from "../../components/dashboard/charts/bar/LastMonthBar";
import LastYearBar from "../../components/dashboard/charts/bar/LastYearBar";

import { fetchGeneralCountryStats } from "../../redux/actions/country/GeneralCountryStatsAction";
import { fetchMeetingStats } from "../../redux/actions/kpi/MeetingStatsAction";
import { getCurrentTime } from "../../util/Date";

class MeetingView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  componentDidMount() {
    this.fetchData();

    setInterval(async () => {
      this.fetchData();
    }, 10000000);
  }

  async fetchData() {
    await this.props.fetchMeetingStats();
    await this.props.fetchGeneralCountryStats();


    const meetingStats = this.props.meetingStats;
    const lastMonth = meetingStats.meetingsLastMonth.data;
    let lastUpdatedAt = getCurrentTime();

    let meetingMonthCount = 0;
    let meetingYearCount = 0;

    lastMonth.forEach((element) => (meetingMonthCount += element.count));
    meetingStats.meetingsLastYear.data.forEach(
      (element) => (meetingYearCount += element.count)
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
      meetingsPerGroup: meetingStats.meetingsPerGroup,
      sharesPerMeeting: meetingStats.sharesPerMeeting,
      meetingsPerCountry: this.props.meetingsCountry,
      lastUpdate: lastUpdatedAt,
    });
  }

  render() {
    const KPICards = {
      meetingTotal: { text: "Total Meetings", icon: "pe-7s-user text-warning" },
      meetingsToday: {
        text: `Meetings ${this.state.meetingsTodayText}`,
        icon: "pe-7s-users text-info",
      },
      meetingMonth: {
        text: "Last Month",
        icon: "pe-7s-graph1 text-danger",
      },
      meetingYear: { text: "Last Year", icon: "pe-7s-wallet text-success" },
    };
    return (
      <div className="wrapper">
        <Sidebar />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header title="Meetings" />
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
                    title="Total Meetings"
                    stroke="#228b22"
                    data={this.state.meetingsLastYear}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <TopBar
                    title="Meetings Per Group"
                    xLabel="Group"
                    yLabel="Meetings"
                    color="#ff0000"
                    data={this.state.meetingsPerGroup}
                    css="card-graph card-stats"
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <TopBar
                    title="Meetings Per Country"
                    xLabel="Country"
                    yLabel="Meetings"
                    color="#228b22"
                    data={this.state.meetingsPerCountry}
                    css="card-graph card-stats"
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={4} sm={6}>
                  <LastMonthBar
                    title="Meetings Last Month"
                    xLabel="Day"
                    yLabel="Meetings"
                    color="#1828E8"
                    data={this.state.meetingsLastMonth}
                  />
                </Col>

                <Col lg={4} sm={6}>
                  <LastYearBar
                    title="Meetings Last Year"
                    xLabel="Month"
                    yLabel="Meetings"
                    color="#8918E8"
                    data={this.state.meetingsLastYear}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <TopBar
                    title="Meetings With Most Shares"
                    xLabel="Meeting"
                    yLabel="Shares"
                    color="#2196f3"
                    data={this.state.sharesPerMeeting}
                    css="card-circle card-stats"
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
    meetingStats: state.KPI.meetingStats,
    meetingsCountry: state.country.meetingsCountry,
  };
};

export default connect(mapStateToProps, {
  fetchMeetingStats,
  fetchGeneralCountryStats,
})(MeetingView);