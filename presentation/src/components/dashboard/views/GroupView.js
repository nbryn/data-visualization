import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import { KPICard } from "../util/KPICard";

import TotalGraph from "../charts/graph/TotalGraph";
import GroupSizeChart from "../charts/circle/GroupSizeChart";

import LastMonthBar from "../charts/bar/LastMonthBar";
import LastYearBar from "../charts/bar/LastYearBar";

import { fetchGroupStats } from "../../../redux/actions/KPI/GroupStatsAction";
import { getCurrentTime } from "../../../util/Date";

class KPIView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupTotal: "",
      groupTotalLastUpdate: "",
      groupsToday: "",
      groupTodayLastUpdate: "",
      groupMonth: "",
      groupYear: "",
      groupsLastMonth: "",
      groupsLastYear: ""
    };
    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    // Error handling when not authenticated?
    this.fetchData();

    // Reload KPI data
    setInterval(async () => {
      // Error handling when not authenticated?
      this.fetchData();
    }, 10000000);
  }

  async fetchData() {
    await this.props.fetchGroupStats();

    const groupStats = this.props.groupStats;
    let lastUpdatedAt = getCurrentTime();

    let groupMonthCount = 0;
    let groupYearCount = 0;

    groupStats.groupsLastMonth.data.forEach(element => groupMonthCount += element.count);
    groupStats.groupsLastYear.data.forEach(element => groupYearCount += element.count);

    this.setState({
      groupTotal: groupStats.groupTotal,
      groupTotalLastUpdate: lastUpdatedAt,
      groupsToday:
        groupStats.groupsLastMonth.data[
          groupStats.groupsLastMonth.data.length - 1
        ].count,
      groupTodayLastUpdate: lastUpdatedAt,
      groupMonth: groupMonthCount,
      groupYear: groupYearCount,
      groupsLastMonth: groupStats.groupsLastMonth.data,
      groupsLastYear: groupStats.groupsLastYear.data
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
                statsText="Total Groups"
                statsValue={this.state.groupTotal}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText={`Last Update: ${this.state.groupTotalLastUpdate}`}
              />
            </Col>

            <Col lg={3} sm={6}>
              <KPICard
                bigIcon={<i className="pe-7s-users text-info" />}
                statsText="Groups Today"
                statsValue={this.state.groupsToday}
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText={`Last Update: ${this.state.groupTodayLastUpdate}`}
              />
            </Col>
            <Col lg={3} sm={6}>
              <KPICard
                bigIcon={<i className="pe-7s-users text-info" />}
                statsText="This Month"
                statsValue={this.state.groupMonth}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText={`Last Update: ${this.state.groupTotalLastUpdate}`}
              />
            </Col>
            <Col lg={3} sm={6}>
              <KPICard
                bigIcon={<i className="pe-7s-users text-info" />}
                statsText="This Year"
                statsValue={this.state.groupYear}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText={`Last Update: ${this.state.groupTotalLastUpdate}`}
              />
            </Col>
          </Row>

          <Row>
            <Col lg={4} sm={6}></Col>
            <TotalGraph title="Total Groups" stroke="#228b22" signups={this.state.groupsLastYear}/>
            <Col lg={4} sm={6}></Col>
          </Row>
          <Row>
            <Col lg={4} sm={6}>
              <LastMonthBar
                signups={this.state.groupsLastMonth}
                title="Groups Last Month"
              />
            </Col>
            <Col lg={4} sm={6}>
              <GroupSizeChart />
            </Col>
            <Col lg={4} sm={6}>
              <LastYearBar
                signups={this.state.groupsLastYear}
                title="Groups Last Year"
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
    groupStats: state.KPI.groupStats
  };
};

export default connect(mapStateToProps, { fetchGroupStats })(KPIView);
