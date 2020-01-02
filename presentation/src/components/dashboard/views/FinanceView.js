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
      sharesPerGroup: "",
      currencyTotal: "",
      currencyStats: "",
      loanTotal: "",
      loansLastMonth: "",
      loansLastYear: "",
      etbOnLoan: "",
      onLoanPerGroup: "",
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

    const loanPerGroup = financeStats.onLoanPerGroup.map(element => {
      return {
        name: element.name.substring(0, 5),
        count: element.count
      };
    });

    loanPerGroup.sort((ele1, ele2) => {
      return ele2.count - ele1.count;
    });

    this.setState({
      shareTotal: financeStats.shareTotal,
      mostShares: financeStats.mostShares.count,
      sharesPerGroup: financeStats.sharesPerGroup,
      currencyTotal: financeStats.currencyTotal,
      currencyStats: financeStats.currencyStats,
      loanTotal: financeStats.loanTotal,
      loansLastMonth: financeStats.loansLastMonth.data,
      loansLastYear: financeStats.loansLastYear.data,
      etbOnLoan: financeStats.etbOnLoan,
      onLoanPerGroup: loanPerGroup.splice(0, 10),
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
                statsText="ETB On Loan"
                statsValue={this.state.etbOnLoan}
                statsIcon={<i className="fa fa-clock-o" />}
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
                data={this.state.sharesPerGroup}
                css="card-graph card-stats"
              />
            </Col>
            <Col lg={4} sm={6}>
              <TopBar
                title="ETB On Loan"
                color="#2196f3"
                xLabel="Group Name"
                yLabel="Amount"
                data={this.state.onLoanPerGroup}
                css="card-graph card-stats"
              />
            </Col>
          </Row>
          <Row>
            <Col lg={4} sm={6}>
              <LastYearBar
                title="Loans Per Month"
                color="#8918E8"
                xLabel="Month"
                yLabel="Loans"
                data={this.state.loansLastYear}
              />
            </Col>
            <Col lg={4} sm={6}>
              <LastMonthBar
                title="Loans Per Day"
                color="#ff0000"
                xLabel="Day"
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
