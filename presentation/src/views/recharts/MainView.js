import { connect } from "react-redux";
import { Col, Grid, Row } from "react-bootstrap";
import React, { Component } from "react";

import BarChartContainer from "../../components/recharts/BarChartContainer";
import { fetchKeyStats } from "../../redux/actions/kpi/KeyStatsAction";
import { getCurrentTime } from "../../util/Date";
import Header from "../../components/navigation/Header";
import { KPICard } from "../../components/kpi/KPICard";
import Sidebar from "../../components/navigation/Sidebar";
import SizeChart from "../../components/recharts/SizeChart";
import LineChartContainer from "../../components/recharts/LineChartContainer";

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

    const { keyStats } = this.props;
    const { userStats, shareStats, groupStats, meetingStats } = keyStats;

    console.log(this.props.keyStats);

    let lastUpdatedAt = getCurrentTime();

    this.setState({
      userTotal: userStats.userCount,
      usersLastYear: userStats.usersLastYear,
      userGender: userStats.userGenderStats,
      groupTotal: groupStats.groupTotal,
      groupsLastMonth: groupStats.groupsLastMonth,
      groupsLastYear: groupStats.groupsLastYear,
      meetingTotal: meetingStats.meetingTotal,
      meetingsLastYear: meetingStats.meetingsLastYear,
      shareTotal: shareStats,
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

    const LineChartContainers = {
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
                {Object.keys(LineChartContainers).map((element, index) => (
                  <Col lg={4} sm={6}>
                    <LineChartContainer
                      title={LineChartContainers[element].title}
                      xLabel="Months"
                      yLabel={LineChartContainers[element].yLabel}
                      stroke={LineChartContainers[element].stroke}
                      data={this.state[element]}
                    />
                  </Col>
                ))}
              </Row>
              <Row>
                <Col lg={4} sm={6}>
                  <BarChartContainer
                    type="Month"
                    title="Groups Last Month"
                    xLabel="Day"
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
                  <BarChartContainer
                    type="Year"
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
