import React, { Component } from "react";
import { connect } from "react-redux";

import { Grid, Row, Col } from "react-bootstrap";
import { KPICard } from "./KPICard.js";
import UserLastMonth from "./Graph/UserLastMonth";
import MoneyTotal from "./Graph/MoneyTotal";
import UserTotal from "./Graph/UserTotal";

import { getUsersTotal } from "../../redux/actions/KPIActions";

class KPIView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      usersTotal: "",
      usersToday: "",
      $Total: ""
    };
  }
  async componentDidMount() {
    // Error handling when not authenticated?
    const t = await this.props.getUsersTotal();

    this.setState({
      usersTotal: this.props.usersTotal.numberOfUsers
    });

    // Reload KPI data
    setInterval(async () => {
      // Error handling when not authenticated?
      const m = await this.props.getUsersTotal();

      this.setState({
        usersTotal: this.props.usersTotal.numberOfUsers
      });
    }, 1000000000);
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
                statsIconText="Updated now"
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
              <UserTotal />
            </Col>
            <Col lg={4} sm={6}>
              <UserLastMonth />
            </Col>
            <Col lg={4} sm={6}>
              <MoneyTotal />
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
