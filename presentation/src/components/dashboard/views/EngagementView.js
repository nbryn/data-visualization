import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import { KPICard } from "../util/KPICard";

import Sidebar from "../../navigation/Sidebar";
import Header from "../../navigation/Header";

import TotalGraph from "../charts/graph/TotalGraph";
import SizeChart from "../charts/circle/SizeChart";

import LastMonthBar from "../charts/bar/LastMonthBar";
import LastYearBar from "../charts/bar/LastYearBar";

import { fetchEngagementStats } from "../../../redux/actions/kpi/EngagementStatsAction";
import { getCurrentTime } from "../../../util/Date";

class EngagementView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeGroups: "",
      groupActivity: "",
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
    await this.props.fetchEngagementStats();

    const lastUpdatedAt = getCurrentTime();

    const engagementStats = this.props.engagementStats;


    this.setState({
      activeGroups: engagementStats.groupEngagement.activeGroups,
      groupActivity: engagementStats.groupEngagement.groupActivity,
      lastUpdate: lastUpdatedAt
    });
  }

  render() {
    return (
      <div className="wrapper">
        <Sidebar />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header title="Engagement" />
          <div className="content">
            <Grid fluid>
              <Row>
                <Col lg={3} sm={6}>
                  <KPICard
                    bigIcon={<i className="pe-7s-graph1 text-danger" />}
                    statsText="Active Users"
                    statsValue=""
                    statsIcon={<i className="fa fa-refresh" />}
                    statsIconText={`Last Update: ${this.state.lastUpdate}`}
                  />
                </Col>

                <Col lg={3} sm={6}>
                  <KPICard
                    bigIcon={<i className="pe-7s-users text-info" />}
                    statsText="Active Groups"
                    statsValue={this.state.activeGroups}
                    statsIcon={<i className="fa fa-clock-o" />}
                    statsIconText={`Last Update: ${this.state.lastUpdate}`}
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <KPICard
                    bigIcon={<i className="pe-7s-users text-info" />}
                    statsText="Active NGO's"
                    statsValue=""
                    statsIcon={<i className="fa fa-refresh" />}
                    statsIconText={`Last Update: ${this.state.lastUpdate}`}
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <KPICard
                    bigIcon={<i className="pe-7s-users text-info" />}
                    statsText="Last Year"
                    statsValue=""
                    statsIcon={<i className="fa fa-refresh" />}
                    statsIconText={`Last Update: ${this.state.lastUpdate}`}
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={4} sm={6}>
                  <TotalGraph title="Engagement" stroke="#228b22" data="" />
                </Col>
              </Row>
              <Row>
                <Col lg={4} sm={6}>
                  <LastMonthBar
                    title="Engagement"
                    color="#228b22"
                    data=""
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <SizeChart
                    title="Months Since Last Meeting"
                    colors={["#ff0000", "#1828E8", "#228b22", "#2196f3"]}
                    data={this.state.groupActivity}
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
    engagementStats: state.KPI.engagementStats
  };
};

export default connect(mapStateToProps, { fetchEngagementStats })(
  EngagementView
);
