import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { KPICard } from "./KPICard.js";

class KPIView extends Component {
  
  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <KPICard
                bigIcon={<i className="pe-7s-user text-warning" />}
                statsText="Total Users"
                statsValue="105"
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
        </Grid>
      </div>
    );
  }
}

export default KPIView;
