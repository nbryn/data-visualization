import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import { KPICard } from "../components/dashboard/common/KPICard";

import Sidebar from "../components/navigation/Sidebar";
import Header from "../components/navigation/Header";

import TotalGraph from "../components/dashboard/charts/graph/TotalGraph";
import LastYearBar from "../components/dashboard/charts/bar/LastYearBar";
import LastMonthBar from "../components/dashboard/charts/bar/LastMonthBar";
import SizeChart from "../components/dashboard/charts/circle/SizeChart";

import { fetchKeyStats } from "../redux/actions/kpi/KeyStatsAction";

import { getCurrentTime } from "../util/Date";

class MainView extends Component {
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
    await this.props.fetchKeyStats();

    const stats = this.props.keyStats;

    let lastUpdatedAt = getCurrentTime();

    this.setState({
      userTotal: stats.userStats.userCount,
      usersLastYear: stats.userStats.usersLastYear.data,
      userGender: stats.userStats.userGenderStats,
      groupTotal: stats.groupStats.groupTotal,
      groupsLastMonth: stats.groupStats.groupsLastMonth.data,
      groupsLastYear: stats.groupStats.groupsLastYear.data,
      meetingTotal: stats.meetingStats.meetingTotal,
      meetingsLastYear: stats.meetingStats.meetingsLastYear.data,
      shareTotal: stats.shareStats,
      lastUpdate: lastUpdatedAt,
    });

    let count = 0;
    this.state.usersLastYear.forEach((ele) => (count += ele.count));
  }

  render() {
    const KPICards = {
      userTotal: { text: "Total Users", icon: "pe-7s-user text-warning" },
      groupTotal: { text: "Total Groups", icon: "pe-7s-users text-info" },
      meetingTotal: {
        text: "Total Meetings",
        icon: "pe-7s-graph1 text-danger",
      },
      shareTotal: { text: "Total Shares", icon: "pe-7s-wallet text-success" },
    };

    const totalGraphs = {
      usersLastYear: {
        title: "Total Users",
        yLabel: "Users",
        stroke: "#ff0000",
      },
      groupsLastYear: {
        title: "Total Groups",
        yLabel: "Groups",
        stroke: "#228b22",
      },
      meetingsLastYear: {
        title: "Total Meetings",
        yLabel: "Meetings",
        stroke: "#2196f3",
      },
    };

    return (
      <div className="wrapper">
        <Sidebar />

        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header title="Dashboard" />
          <div className="content">
            <Grid fluid>
              <Row>
                {Object.keys(KPICards).map((kpi, index) => (
                  <Col lg={3} sm={6}>
                    <KPICard
                      bigIcon={<i className={KPICards[kpi].icon} />}
                      statsText={KPICards[kpi].text}
                      statsValue={this.state[kpi]}
                      statsIcon={<i className="fa fa-refresh" />}
                      statsIconText={`Last Update: ${this.state.lastUpdate}`}
                    />
                  </Col>
                ))}
              </Row>

              <Row>
                {Object.keys(totalGraphs).map((element, index) => (
                  <Col lg={4} sm={6}>
                    <TotalGraph
                      title={totalGraphs[element].title}
                      xLabel="Months"
                      yLabel={totalGraphs[element].yLabel}
                      stroke={totalGraphs[element].stroke}
                      data={this.state[element]}
                    />
                  </Col>
                ))}
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
                    colors={["#1828E8", "#228b22"]}
                    data={this.state.userGender}
                  />
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    keyStats: state.KPI.keyStats,
  };
};

export default connect(mapStateToProps, {
  fetchKeyStats,
})(MainView);
