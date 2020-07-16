import { Col, Grid, Row } from "react-bootstrap";
import { connect } from "react-redux";
import React, { Component } from "react";

import BarChartContainer from "../../components/dashboard/recharts/bar/BarChartContainer";
import { fetchFinanceStats } from "../../redux/actions/kpi/FinanceStatsAction";
import { getCurrentTime } from "../../util/Date";
import Header from "../../components/navigation/Header";
import { KPICard } from "../../components/dashboard/kpi/KPICard";
import Sidebar from "../../components/navigation/Sidebar";
import TotalGraph from "../../components/dashboard/recharts/graph/TotalGraph";


class FinanceView extends Component {
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
    await this.props.fetchFinanceStats();

    const { financeStats } = this.props;
    const { shareStats, currencyStats, etbStats } = financeStats;

    let lastUpdatedAt = getCurrentTime();

    // TODO: Move to backend?
    const loansPerGroup = etbStats.groupLoan.map((element) => {
      return {
        name: element.name.substring(0, 5),
        count: element.count,
      };
    });

    loansPerGroup.sort((ele1, ele2) => ele2.count - ele1.count);

    this.setState({
      shareTotal: shareStats.shareTotal,
      mostShares: shareStats.mostShares.count,
      sharesPerGroup: shareStats.groupShares,
      currencyTotal: currencyStats.numberOfCurrencies,
      currencyStats: currencyStats.currency,
      loanTotal: financeStats.loanTotal,
      loansLastMonth: financeStats.loansLastMonth.data,
      loansLastYear: financeStats.loansLastYear.data,
      etbOnLoan: etbStats.etbOnLoan,
      onLoanPerGroup: loansPerGroup.splice(0, 10),
      lastUpdate: lastUpdatedAt,
    });
  }

  render() {
    const KPICards = {
      shareTotal: { text: "Total Shares", icon: "pe-7s-graph1 text-danger" },
      loanTotal: { text: "Total Loans", icon: "pe-7s-users text-info" },
      etbOnLoan: {
        text: "ETB On Loan",
        icon: "pe-7s-wallet text-success",
      },
      mostShares: {
        text: "Most Shares In Group",
        icon: "pe-7s-wallet text-success",
      },
    };

    return (
      <div className="wrapper">
        <Sidebar />

        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header title="Finance" />
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
                    title="Total Loans"
                    xLabel="Months"
                    yLabel="Loans"
                    stroke="#228b22"
                    data={this.state.loansLastYear}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <BarChartContainer
                    type="Top"
                    title="Most Shares"
                    color="#1828E8"
                    xLabel="Group Name"
                    yLabel="Shares"
                    data={this.state.sharesPerGroup}
                    css="card-graph card-stats"
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <BarChartContainer
                    type="Top"
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
                  <BarChartContainer
                    type="Year"
                    title="Loans Per Month"
                    color="#8918E8"
                    xLabel="Month"
                    yLabel="Loans"
                    data={this.state.loansLastYear}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <BarChartContainer
                    type="Month"
                    title="Loans Per Day"
                    color="#ff0000"
                    xLabel="Day"
                    yLabel="Loans"
                    data={this.state.loansLastMonth}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <BarChartContainer
                    type="Top"
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    financeStats: state.KPI.financeStats,
  };
};

export default connect(mapStateToProps, { fetchFinanceStats })(FinanceView);
