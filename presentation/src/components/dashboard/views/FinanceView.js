import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Row, Col } from "react-bootstrap";
import { KPICard } from "../util/KPICard";

import TotalGraph from "../charts/graph/TotalGraph";
import LastYearBar from "../charts/bar/LastYearBar";
import LastMonthBar from "../charts/bar/LastMonthBar";
import TopBar from "../charts/bar/TopBar";

import { fetchFinanceStats } from "../../../redux/actions/KPI/FinanceStatsAction";
import { getCurrentTime } from "../../../util/Date";

class FinanceView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shareTotal: "",
      mostShares: "",
      shareStats: "",
      currencyTotal: "",
      currencyStats: "",
      loanTotal: "",
      loansLastMonth: "",
      loansLastYear: "",
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
    await this.props.fetchFinanceStats();

    const financeStats = this.props.financeStats;
    let lastUpdatedAt = getCurrentTime();

    this.setState({
      shareTotal: financeStats.shareTotal,
      mostShares: financeStats.mostShares.count,
      shareStats: financeStats.sharesPerGroup,
      currencyTotal: financeStats.currencyTotal,
      currencyStats: financeStats.currencyStats,
      loanTotal: financeStats.loanTotal,
      loansLastMonth: financeStats.loansLastMonth.data,
      loansLastYear: financeStats.loansLastYear.data,
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
                statsValue={this.state.loanTotal}
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
            <Col lg={4} sm={6}>
              <TotalGraph
                title="Total Loans"
                xLabel="Months"
                yLabel="Loans"
                stroke="#228b22"
                data={this.state.loansLastYear}
              />
            </Col>
            <Col lg={4} sm={6}>
              <TopBar
                title="Most Shares"
                color="#1828E8"
                xLabel="Group Name"
                yLabel="Shares"
                data={this.state.shareStats}
                css="card-graph card-stats"
              />
            </Col>
          </Row>
          <Row>
            <Col lg={4} sm={6}>
              <LastYearBar
                title="Loans Last Year"
                color="#8918E8"
                xLabel="Months"
                yLabel="Loans"
                data={this.state.loansLastYear}
              />
            </Col>
            <Col lg={4} sm={6}>
              <LastMonthBar
                title="Loans Last Month"
                color="#ff0000"
                xLabel="Months"
                yLabel="Loans"
                data={this.state.loansLastMonth}
              />
            </Col>
            <Col lg={4} sm={6}>
              <TopBar
                title="Currencies"
                color="#2196f3"
                xLabel="Currency"
                yLabel="Amount"
                data={this.state.currencyStats}
                css="card-circle card-stats"
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
