import { Col, Grid, Row } from 'react-bootstrap';
import React, { Component } from 'react';

import Header from '../../components/navigation/Header';
import Sidebar from '../../components/navigation/Sidebar';

import { fetchUsersPerNGO } from '../../services/requests/NGOUsersRequest';
import { fetchUsersPerCountry } from '../../services/requests/CountryUsersRequest';
import { fetchTotalUsers } from '../../services/requests/UsersTotalRequest';
import { fetchUsersLastMonth } from '../../services/requests/UsersLastMonthRequest';
import { fetchUsersLastYear } from '../../services/requests/UsersLastYearRequest';

import KPITodayContainer from '../../containers/KPITodayContainer';

import {
  BarChartContainer,
  LineChartContainer,
  PieChartContainer
} from '../../containers';

import {
  usersLastYearBarChart,
  usersLastYearLineChart,
  usersTotal,
  usersToday,
  usersLastMonth,
  usersLastYear,
  usersLastMonthBarChart
} from '../../store/user/UserActions';

import { usersPerCountry } from '../../store/country/CountryActions';
import { usersPerNGO } from '../../store/ngo/NGOActions';

import KPIContainer from '../../containers/KPIContainer';

import * as UserThunks from '../../thunks/UserThunks';
import * as Thunks from '../../thunks/Thunks';

class UserView extends Component {
  render() {
    return (
      <div className="wrapper">
        <Sidebar />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header title="Users" />
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
                  <KPITodayContainer
                    fetchData={() =>
                      Thunks.setToday(fetchUsersLastMonth, usersToday)
                    }
                    statsType="userStats"
                    countData="todayCount"
                    dateData="todayDate"
                    icon="pe-7s-users text-info"
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <KPIContainer
                    title="Last Year"
                    fetchData={() =>
                      Thunks.setPeriod(fetchUsersLastYear, usersLastYear)
                    }
                    statsType="userStats"
                    total="usersLastYear"
                    icon="pe-7s-wallet text-success"
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <KPIContainer
                    title="Last Month"
                    fetchData={() =>
                      Thunks.setPeriod(fetchUsersLastMonth, usersLastMonth)
                    }
                    statsType="userStats"
                    total="usersLastMonth"
                    icon="pe-7s-users text-info"
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
                  <BarChartContainer
                    title="Users Per Country"
                    fetchData={() =>
                      Thunks.setGeneralStat(
                        fetchUsersPerCountry,
                        usersPerCountry
                      )
                    }
                    statsType="countryStats"
                    dataType="countryUsers"
                    xLabel="Country"
                    yLabel="Users"
                    color="#1828E8"
                    css="card-graph card-stats"
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <BarChartContainer
                    title="Users Per NGO"
                    fetchData={() =>
                      Thunks.setGeneralStat(fetchUsersPerNGO, usersPerNGO)
                    }
                    statsType="ngoStats"
                    dataType="usersPerNGO"
                    xLabel="NGO"
                    yLabel="Users"
                    color="#2196f3"
                    css="card-graph card-stats"
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={4} sm={6}>
                  <BarChartContainer
                    title="Users Per Day"
                    fetchData={() =>
                      Thunks.setLastMonthBarChart(
                        fetchUsersLastMonth,
                        usersLastMonthBarChart
                      )
                    }
                    statsType="userStats"
                    dataType="usersLastMonthBarChart"
                    xLabel="Day"
                    yLabel="Users"
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
                    title="Users Per Month"
                    fetchData={() =>
                      Thunks.setLastYearBarChart(
                        fetchUsersLastYear,
                        usersLastYearBarChart
                      )
                    }
                    statsType="userStats"
                    dataType="usersLastYearBarChart"
                    xLabel="Month"
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

export default UserView;
