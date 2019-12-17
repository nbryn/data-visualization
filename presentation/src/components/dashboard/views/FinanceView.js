import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import { KPICard } from "../util/KPICard";
import  TopBar from "../charts/bar/TopBar";

import { fetchFinanceStats } from "../../../redux/actions/KPI/FinanceStatsAction";
import { getCurrentTime } from "../../../util/Date";

class FinanceView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shareTotal: "",
      mostShares: "",
      shareStats: "",
      loanTotal: "",
      currencyTotal: "",
      currencyStats: "",
      lastUpdate: ""
    };
    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    this.fetchData();

    setInterval(async () => {
      this.fetchData();
    }, 10000000);
  }

  async fetchData() {
    await this.props.fetchFinanceStats();

    const financeStats = this.props.financeStats;
    let lastUpdatedAt = getCurrentTime();
    
    this.setState({
      shareTotal: financeStats.shareTotal,
      mostShares: financeStats.mostShares.amount,
      shareStats: financeStats.shareStats,
      currencyTotal: financeStats.currencyTotal,
      currencyStats: financeStats.currencyStats,
      lastUpdate: lastUpdatedAt
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
                statsText="Total Shares"
                statsValue={this.state.shareTotal}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText={`Last Update: ${this.state.lastUpdate}`}
              />
            </Col>
            <Col lg={3} sm={6}>
              <KPICard
                bigIcon={<i className="pe-7s-users text-info" />}
                statsText="Total Loans"
                statsValue={this.state.totalLoans}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText={`Last Update: ${this.state.lastUpdate}`}
              />
            </Col>
            
            <Col lg={3} sm={6}>
              <KPICard
                bigIcon={<i className="pe-7s-users text-info" />}
                statsText="Most Shares In Group"
                statsValue={this.state.mostShares}
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText={`Last Update: ${this.state.lastUpdate}`}
              />
            </Col>
            
            <Col lg={3} sm={6}>
              <KPICard
                bigIcon={<i className="pe-7s-users text-info" />}
                statsText="Total Currencies"
                statsValue={this.state.currencyTotal}
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText={`Last Update: ${this.state.lastUpdate}`}
              />
            </Col>
          </Row>
          <Row>
          <Col lg={3} sm={6}>
           <TopBar
            title="Currencies"
            color="#ff0000"
            xLabel="Currency"
            yLabel="Amount"
            data={this.state.currencyStats}
          />
          </Col>
          <Col lg={3} sm={6}>
          <TopBar
            title="Most Shares"
            color="#1828E8"
            xLabel="Group Name"
            yLabel="Amount"
            data={this.state.shareStats}
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
    financeStats: state.KPI.financeStats
  };
};

export default connect(mapStateToProps, { fetchFinanceStats })(FinanceView);
