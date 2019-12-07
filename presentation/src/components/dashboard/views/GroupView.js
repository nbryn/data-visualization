import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import { KPICard } from "../util/KPICard";

import GroupTotalGraph from "../charts/graph/GroupTotalGraph";
import GroupSizeChart from "../charts/circle/GroupSizeChart";
import GroupsLastMonthBar from "../charts/bar/GroupsLastMonthBar";

import { fetchGroupStats } from "../../../redux/actions/KPI/GroupStatsAction";
import { getCurrentTime } from "../../../util/Date";

class KPIView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupTotal: "",
      groupTotalLastUpdate: "",
      groupsToday: "",
      groupTodayLastUpdate: ""
    };
  }
  async componentDidMount() {
    // Error handling when not authenticated?
    await this.props.fetchGroupStats();

    const groupTotal = this.props.groupStats.groupTotal;
    const signups = this.props.groupStats.groupsLastMonth.resultMonth;

    let lastUpdatedAt = getCurrentTime();

    this.setState({
      groupTotal: groupTotal,
      groupTotalLastUpdate: lastUpdatedAt,
      groupsToday: signups[signups.length-1].count,
      groupTodayLastUpdate: lastUpdatedAt
    });

    // Reload KPI data
    setInterval(async () => {
      // Error handling when not authenticated?
      await this.props.fetchGroupStats();

      const groupTotal = this.props.groupStats.groupTotal;
      const signups = this.props.groupStats.groupsLastMonth.resultMonth;

      let lastUpdatedAt = getCurrentTime();

      this.setState({
        groupTotal: groupTotal,
        groupTotalLastUpdate: lastUpdatedAt,
        groupsToday: signups[signups.length-1].count,
        groupTodayLastUpdate: lastUpdatedAt
      });
    }, 1000000);
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
                statsValue={this.state.groupTotal}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText={`Last Update: ${this.state.groupTotalLastUpdate}`}
              />
            </Col>
            <Col lg={3} sm={6}>
              <KPICard
                bigIcon={<i className="pe-7s-users text-info" />}
                statsText="This Year"
                statsValue={this.state.groupTotal}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText={`Last Update: ${this.state.groupTotalLastUpdate}`}
              />
            </Col>
          </Row>

          <Row>
            <Col lg={4} sm={6}></Col>
            <GroupTotalGraph />
            <Col lg={4} sm={6}></Col>
          </Row>
          <Row>
          <Col lg={4} sm={6}>
              <GroupsLastMonthBar />
            </Col>
            <Col lg={4} sm={6}>
              <GroupSizeChart />
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
