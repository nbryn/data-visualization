import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import { KPICard } from "../components/dashboard/common/KPICard";

import Sidebar from "../components/navigation/Sidebar";
import Header from "../components/navigation/Header";

import TotalGraph from "../components/dashboard/charts/graph/TotalGraph";
import SizeChart from "../components/dashboard/charts/circle/SizeChart";

import TopBar from "../components/dashboard/charts/bar/TopBar";
import LastMonthBar from "../components/dashboard/charts/bar/LastMonthBar";
import LastYearBar from "../components/dashboard/charts/bar/LastYearBar";

import { fetchGroupStats } from "../redux/actions/kpi/GroupStatsAction";
import { fetchNGOStats } from "../redux/actions/ngo/NGOStatsAction";
import { fetchGeneralCountryStats } from "../redux/actions/country/GeneralCountryStatsAction";
import { getCurrentTime } from "../util/Date";

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
    await this.props.fetchNGOStats();
    await this.props.fetchGeneralCountryStats();
    
    const { groupStats, groupsNGO, groupsCountry } = this.props;
    const lastMonth = groupStats.groupsLastMonth.data;
    const lastUpdatedAt = getCurrentTime();

    let groupMonthCount = 0;
    let groupYearCount = 0;

    lastMonth.forEach((element) => (groupMonthCount += element.count));
    groupStats.groupsLastYear.data.forEach(
      (element) => (groupYearCount += element.count)
    );

    this.setState({
      groupsTotal: groupStats.groupTotal,
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
      groupsPerCountry: groupsCountry,
      groupsPerNGO: groupsNGO,
      lastUpdate: lastUpdatedAt,
    });
  }

  render() {
    const KPICards = {
      groupsTotal: { text: "Total Groups", icon: "pe-7s-graph1 text-danger" },
      groupsToday: {
        text: `Groups ${this.state.groupsTodayText}`,
        icon: "pe-7s-users text-info",
      },
      groupsLastMonthTotal: {
        text: "Last Month",
        icon: "pe-7s-graph1 text-danger",
      },
      groupsLastYearTotal: {
        text: "Last Year",
        icon: "pe-7s-graph1 text-danger",
      },
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
                    color="#1828E8"
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
                    color="#8918E8"
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
                      "#228b22",
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

const mapStateToProps = (state) => {
  return {
    groupStats: state.KPI.groupStats,
    groupsNGO: state.NGO.groupsNGO,
    groupsCountry: state.country.groupsCountry
  };
};

export default connect(mapStateToProps, { fetchGroupStats, fetchNGOStats, fetchGeneralCountryStats })(
  GroupView
);
