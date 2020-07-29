import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import KPICard from '../../components/kpi/KPICard';

import * as Thunks from '../../thunks/Thunks';

import Header from '../../components/navigation/Header';
import { getCurrentTime } from '../../util/Date';
import BarContainer from '../../components/recharts/BarChartContainer';
import Sidebar from '../../components/navigation/Sidebar';
import SizeChart from '../../components/recharts/SizeChart';
import TotalGraph from '../../components/recharts/LineChartContainer';

class EngagementView extends Component {
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
    await Thunks.setEngagementViewData();

    const lastUpdatedAt = getCurrentTime();

    const engagementStats = this.props.engagementStats;

    this.setState({
      groupsActive: engagementStats.groupEngagement.groupsActive,
      groupActivity: engagementStats.groupEngagement.groupMeetingFrequency,
      usersActive: engagementStats.userEngagement,
      ngosActive: '',
      meetings: '',

      lastUpdate: lastUpdatedAt
    });
  }

  render() {
    const KPICards = {
      usersActive: { text: 'Active Users', icon: 'pe-7s-graph1 text-danger' },
      groupsActive: { text: 'Active Groups', icon: 'pe-7s-users text-info' },
      ngosActive: {
        text: "Active NGO's",
        icon: 'pe-7s-users text-info'
      },
      meetings: {
        text: 'Meetings in Active Groups',
        icon: 'pe-7s-users text-info'
      }
    };
    return (
      <div className="wrapper">
        <Sidebar />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header title="Engagement" />
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
                  <TotalGraph title="Engagement" stroke="#228b22" data="" />
                </Col>
              </Row>
              <Row>
                <Col lg={4} sm={6}>
                  <BarContainer title="Engagement" color="#228b22" data="" />
                </Col>
                <Col lg={4} sm={6}>
                  <SizeChart
                    title="Months Since Last Meeting"
                    colors={['#ff0000', '#1828E8', '#228b22', '#2196f3']}
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

const mapStateToProps = (state) => {
  return {
    engagementStats: state.general.engagementData
  };
};

export default connect(mapStateToProps)(EngagementView);
