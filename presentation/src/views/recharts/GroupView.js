import { Col, Grid, Row } from 'react-bootstrap';
import React, { Component } from 'react';

import Header from '../../components/navigation/Header';

import Sidebar from '../../components/navigation/Sidebar';
import {
  BarChartContainer,
  LineChartContainer,
  PieChartContainer
} from '../../containers';

import { groupsPerCountry } from '../../store/country/CountryActions';
import { fetchGroupsPerCountry } from '../../services/requests/CountryGroupsRequest';
import { groupsPerNGO } from '../../store/ngo/NGOActions';
import { fetchGroupsPerNGO } from '../../services/requests/NGOGroupsRequest';
import { fetchGroupsLastMonth } from '../../services/requests/GroupsLastMonthRequest';
import { fetchGroupsLastYear } from '../../services/requests/GroupsLastYearRequest';

import { fetchGroupSizeStats } from '../../services/requests/GroupSizeRequest';
import { fetchTotalGroups } from '../../services/requests/GroupsTotalRequest';
import {
  groupsLastMonth,
  groupsLastYear,
  groupsLastYearLineChart,
  groupsLastMonthBarChart,
  groupsLastYearBarChart,
  groupsTotal,
  groupSizeStats
} from '../../store/group/GroupActions';

import * as Thunks from '../../thunks/Thunks';
import KPIContainer from '../../containers/KPIContainer';

class GroupView extends Component {
  render() {
    return (
      <div className="wrapper">
        <Sidebar />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header title="Groups" />
          <div className="content">
            <Grid fluid>
              <Row>
                <Col lg={3} sm={6}>
                  <KPIContainer
                    title="Total Groups"
                    fetchData={() =>
                      Thunks.setTotal(fetchTotalGroups, groupsTotal)
                    }
                    statsType="groupStats"
                    total="groupsTotal"
                    icon="pe-7s-graph1 text-danger"
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <KPIContainer
                    title="Last Year"
                    fetchData={() =>
                      Thunks.setPeriod(fetchGroupsLastYear, groupsLastYear)
                    }
                    statsType="groupStats"
                    total="groupsLastYear"
                    icon="pe-7s-graph1 text-danger"
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <KPIContainer
                    title="Last Month"
                    fetchData={() =>
                      Thunks.setPeriod(fetchGroupsLastMonth, groupsLastMonth)
                    }
                    statsType="groupStats"
                    total="groupsLastMonth"
                    icon="pe-7s-users text-info"
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={4} sm={6}>
                  <LineChartContainer
                    title="Total Groups"
                    fetchData={() =>
                      Thunks.setLastYearLineChart(
                        fetchGroupsLastYear,
                        groupsLastYearLineChart
                      )
                    }
                    statsType="groupStats"
                    dataType="groupsLastYearLineChart"
                    xLabel="Months"
                    yLabel="Groups"
                    color="#228b22"
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <BarChartContainer
                    title="Groups Per Country"
                    fetchData={() => 
                      Thunks.setGeneralStat(
                        fetchGroupsPerCountry,
                        groupsPerCountry
                      )
                    }
                    statsType="countryStats"
                    dataType="countryGroups"
                    xLabel="Country"
                    yLabel="Groups"
                    color="#1828E8"
                    css="card-graph card-stats"
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <BarChartContainer
                    title="Groups Per NGO"
                    fetchData={() => 
                      Thunks.setGeneralStat(fetchGroupsPerNGO, groupsPerNGO)
                    }
                    statsType="ngoStats"
                    dataType="groupsPerNGO"
                    xLabel="NGO"
                    yLabel="Groups"
                    color="#ff0000"
                    css="card-graph card-stats"
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={4} sm={6}>
                  <BarChartContainer
                    title="Groups Last Month"
                    fetchData={() => 
                      Thunks.setLastMonthBarChart(
                        fetchGroupsLastMonth,
                        groupsLastMonthBarChart
                      )
                    }
                    statsType="groupStats"
                    dataType="groupsLastMonthBarChart"
                    xLabel="day"
                    yLabel="groups"
                    color="#228b22"
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <PieChartContainer
                    title="Group Size"
                    fetchData={() => 
                      Thunks.setGeneralStat(
                        fetchGroupSizeStats,
                        groupSizeStats
                      )
                    }
                    statsType="groupStats"
                    dataType="groupSizeStats"
                    colors={[
                      '#a4de6c',
                      '#67b6ed',
                      '#8884d8',
                      '#ff0000',
                      '#2196f3',
                      '#228b22'
                    ]}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <BarChartContainer
                    title="Groups Last Year"
                    fetchData={() =>
                      Thunks.setLastYearBarChart(
                        fetchGroupsLastYear,
                        groupsLastYearBarChart
                      )
                    }
                    statsType="groupStats"
                    dataType="groupsLastYearBarChart"
                    xLabel="Month"
                    yLabel="groups"
                    color="#2196f3"
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

export default GroupView;
