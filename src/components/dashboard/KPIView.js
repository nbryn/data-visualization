import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";

import { KPICard } from "./KPICard.js";

import UsersLastMonthGraph from "./charts/graph/UsersLastMonthGraph";
import MoneyTotalGraph from "./charts/graph/MoneyTotalGraph";
import UsersTotalGraph from "./charts/graph/UsersTotalGraph";

import SoMeCircleChart from "./charts/circle/SoMeCircleChart";

import { getUsersTotal } from "../../redux/actions/KPI/UserTotalAction";
import { getTime } from "../../util/Date";

class KPIView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usersTotal: "",
      usersTotalLastUpdate: "",
      usersToday: "",
      $Total: ""
    };
  }
  async componentDidMount() {
    // Error handling when not authenticated?
    const temp = await this.props.getUsersTotal();

    let lastUpdatedAt = getTime();

    this.setState({
      usersTotal: this.props.usersTotal.numberOfUsers,
      usersTotalLastUpdate: lastUpdatedAt
    });

    // Reload KPI data
    setInterval(async () => {
      // Error handling when not authenticated?
      const m = await this.props.getUsersTotal();

      let lastUpdatedAt = getTime();

      this.setState({
        usersTotal: this.props.usersTotal.numberOfUsers,
        usersTotalUpdate: lastUpdatedAt
      });
    }, 100000);
  }

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <KPICard
                bigIcon={<i className="pe-7s-user text-warning" />}
                statsText="Total Users"
                statsValue={this.state.usersTotal}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText={`Last Update: ${this.state.usersTotalLastUpdate}`}
              />
            </Col>
            <Col lg={3} sm={6}>
              <KPICard
                bigIcon={<i className="pe-7s-wallet text-success" />}
                statsText="Amount Registered"
                statsValue="$5,345"
                statsIcon={<i className="fa fa-calendar-o" />}
                statsIconText="Last day"
              />
            </Col>
            <Col lg={3} sm={6}>
              <KPICard
                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                statsText="New Users Today"
                statsValue="23"
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col>
            <Col lg={3} sm={6}>
              <KPICard
                bigIcon={<i className="fa fa-twitter text-info" />}
                statsText="Social Media Followers"
                statsValue="+45"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
          </Row>

          <Row>
            <Col lg={4} sm={6}>
              <UsersTotalGraph />
            </Col>
            <Col lg={4} sm={6}>
              <UsersLastMonthGraph />
            </Col>
            <Col lg={4} sm={6}>
              <MoneyTotalGraph />
            </Col>
          </Row>
          <Row>
            <Col lg={4} sm={6}>
              <SoMeCircleChart />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    usersTotal: state.KPI.usersTotal
  };
};

export default connect(mapStateToProps, { getUsersTotal })(KPIView);
