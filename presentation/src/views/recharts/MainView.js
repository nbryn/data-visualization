import { Col, Grid, Row } from 'react-bootstrap';
import React, { Component } from 'react';

import Header from '../../components/navigation/Header';
import Sidebar from '../../components/navigation/Sidebar';
import KPIContainer from '../../containers/KPIContainer';
import {
  BarChartContainer,
  LineChartContainer,
  PieChartContainer
} from '../../containers';

import { fetchTotalShares } from '../../services/requests/SharesTotalRequest';
import { fetchTotalUsers } from '../../services/requests/UsersTotalRequest';
import { fetchUsersLastYear } from '../../services/requests/UsersLastYearRequest';
import { fetchGroupsLastMonth } from '../../services/requests/GroupsLastMonthRequest';
import { fetchTotalGroups } from '../../services/requests/GroupsTotalRequest';

import { fetchGroupsLastYear } from '../../services/requests/GroupsLastYearRequest';
import {
  groupsLastMonthBarChart,
  groupsLastYearLineChart,
  groupsTotal
} from '../../store/group/GroupActions';
import { fetchMeetingsLastYear } from '../../services/requests/MeetingsLastYearRequest';
import { fetchTotalMeetings } from '../../services/requests/MeetingsTotalRequest';
import {
  meetingsLastYear,
  meetingsTotal
} from '../../store/meeting/MeetingActions';

import { sharesTotal } from '../../store/finance/FinanceActions';
import {
  usersLastYearBarChart,
  usersLastYearLineChart,
  usersTotal
} from '../../store/user/UserActions';

import * as UserThunks from '../../thunks/UserThunks';
import * as Thunks from '../../thunks/Thunks';

class MainView extends Component {
  render() {
    return (
      <div className="wrapper">
        <Sidebar />

        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header title="Dashboard" />
          <div className="content">
            <Grid fluid>
              <Row>
                <Col lg={3} sm={6}>
                  <KPIContainer
                    title="Total Users"
                    fetchData={() =>
                      Thunks.setTotal(fetchTotalUsers, usersTotal)
                    }
                    statsType="userStats"
                    total="usersTotal"
                    icon="pe-7s-user text-warning"
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <KPIContainer
                    title="Total Groups"
                    fetchData={() =>
                      Thunks.setTotal(fetchTotalGroups, groupsTotal)
                    }
                    statsType="groupStats"
                    total="groupsTotal"
                    icon="pe-7s-users text-info"
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <KPIContainer
                    title="Total Meetings"
                    fetchData={() =>
                      Thunks.setTotal(fetchTotalMeetings, meetingsTotal)
                    }
                    statsType="meetingStats"
                    total="meetingsTotal"
                    icon="pe-7s-graph1 text-danger"
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <KPIContainer
                    title="Total Shares"
                    fetchData={() =>
                      Thunks.setTotal(fetchTotalShares, sharesTotal)
                    }
                    statsType="financeStats"
                    total="sharesTotal"
                    icon="pe-7s-graph1 text-danger"
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={4} sm={6}>
                  <LineChartContainer
                    title="Total Users"
                    fetchData={() =>
                      Thunks.setLastYearLineChart(
                        fetchUsersLastYear,
                        usersLastYearLineChart
                      )
                    }
                    statsType="userStats"
                    dataType="usersLastYearLineChart"
                    xLabel="Months"
                    yLabel="Users"
                    color="#ff0000"
                  />
                </Col>
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
                  <LineChartContainer
                    title="Total Meetings"
                    fetchData={() =>
                      Thunks.setLastYearLineChart(
                        fetchMeetingsLastYear,
                        meetingsLastYear
                      )
                    }
                    statsType="meetingStats"
                    dataType="meetingsLastYear"
                    xLabel="Months"
                    yLabel="Meetings"
                    color="#2196f3"
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
                    title="Gender Distribution"
                    fetchData={UserThunks.setGenderStats}
                    statsType="userStats"
                    dataType="genderStats"
                    colors={['#1828E8', '#228b22']}
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <BarChartContainer
                    title="Users Last Year"
                    fetchData={() =>
                      Thunks.setLastYearBarChart(
                        fetchUsersLastYear,
                        usersLastYearBarChart
                      )
                    }
                    statsType="userStats"
                    dataType="usersLastYearBarChart"
                    xLabel="Months"
                    yLabel="Users"
                    color="#ff0000"
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

export default MainView;
