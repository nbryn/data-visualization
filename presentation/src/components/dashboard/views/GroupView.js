import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import { KPICard } from "../util/KPICard";

import Sidebar from "../../navigation/Sidebar";
import Header from "../../navigation/Header";

import TotalGraph from "../charts/graph/TotalGraph";
import SizeChart from "../charts/circle/SizeChart";

import TopBar from "../charts/bar/TopBar";
import LastMonthBar from "../charts/bar/LastMonthBar";
import LastYearBar from "../charts/bar/LastYearBar";

import { fetchGroupStats } from "../../../redux/actions/kpi/GroupStatsAction";
import { getCurrentTime } from "../../../util/Date";

class GroupView extends Component {
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
    await this.props.fetchGroupStats();

    const groupStats = this.props.groupStats;
    const lastMonth = groupStats.groupsLastMonth.data;
    const lastUpdatedAt = getCurrentTime();

    let groupMonthCount = 0;
    let groupYearCount = 0;

    lastMonth.forEach(element => (groupMonthCount += element.count));
    groupStats.groupsLastYear.data.forEach(
      element => (groupYearCount += element.count)
    );

    this.setState({
      groupTotal: groupStats.groupTotal,
      groupsToday: lastMonth[lastMonth.length - 1].count,
      groupsTodayText:
        lastMonth[lastMonth.length - 1].day.day +
        "/" +
        lastMonth[lastMonth.length - 1].day.month,
      groupsLastMonthTotal: groupMonthCount,
      groupsLastYearTotal: groupYearCount,
      groupSize: groupStats.groupSize,
      groupsLastMonth: lastMonth,
      groupsLastYear: groupStats.groupsLastYear.data,
      groupsPerCountry: groupStats.groupsCountry,
      groupsPerNGO: groupStats.groupsNGO,
      lastUpdate: lastUpdatedAt
    });
  }

  render() {
    const KPICards = {
      groupsTotal: { text: "Total Groups", icon: "pe-7s-graph1 text-danger" },
      groupsToday: {
        text: `Groups ${this.state.groupsTodayText}`,
        icon: "pe-7s-users text-info"
      },
      groupsLastMonthTotal: {
        text: "Last Month",
        icon: "pe-7s-graph1 text-danger"
      },
      groupsLastYearTotal: {
        text: "Last Year",
        icon: "pe-7s-graph1 text-danger"
      }
    };
    return (
      <div className="wrapper">
        <Sidebar />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header title="Groups" />
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
                <Col lg={4} sm={6}>
                  <TotalGraph
                    title="Total Groups"
                    stroke="#228b22"
                    data={this.state.groupsLastYear}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <TopBar
                    title="Groups Per Country"
                    xLabel="Countries"
                    yLabel="Groups"
                    color="#ff0000"
                    data={this.state.groupsPerCountry}
                    css="card-graph card-stats"
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <TopBar
                    title="Groups Per NGO"
                    xLabel="NGOs"
                    yLabel="Groups"
                    color="#ff0000"
                    data={this.state.groupsPerNGO}
                    css="card-graph card-stats"
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={4} sm={6}>
                  <LastMonthBar
                    title="Groups Last Month"
                    color="#228b22"
                    xLabel="Days"
                    yLabel="Groups"
                    data={this.state.groupsLastMonth}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <SizeChart
                    title="Group Size"
                    colors={[
                      "#a4de6c",
                      "#67b6ed",
                      "#8884d8",
                      "#ff0000",
                      "#2196f3",
                      "#228b22"
                    ]}
                    data={this.state.groupSize}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <LastYearBar
                    title="Groups Last Year"
                    color="#2196f3"
                    xLabel="Months"
                    yLabel="Groups"
                    data={this.state.groupsLastYear}
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
    groupStats: state.KPI.groupStats
  };
};

export default connect(mapStateToProps, { fetchGroupStats })(GroupView);
