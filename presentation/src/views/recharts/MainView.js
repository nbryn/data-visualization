import { Col, Grid, Row } from "react-bootstrap";
import React, { Component } from "react";

import { fetchMeetingsLastYear } from "../../redux/actions/MeetingActions";
import { fetchGroupsLastYear } from "../../redux/actions/GroupActions";
import { fetchTotalGroups } from "../../redux/actions/GroupActions";
import { fetchTotalMeetings } from "../../redux/actions/MeetingActions";
import { fetchTotalShares } from "../../redux/actions/FinanceActions";
import { fetchTotalUsers } from "../../redux/actions/UserActions";
import { fetchUsersLastYear } from "../../redux/actions/UserActions";
import Header from "../../components/navigation/Header";
import Sidebar from "../../components/navigation/Sidebar";
import KPIContainer from "../../containers/KPIContainer";
import {
  MeetingTotalLineChartContainer,
  GroupLastMonthBarChartContainer,
  GroupTotalLineChartContainer,
  UserGenderPieChartContainer,
  UserLastYearBarChartContainer,
  UserTotalLineChartContainer,
} from "../../containers";

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
                    fetchData={fetchTotalUsers}
                    statsType="userStats"
                    total="usersTotal"
                    icon="pe-7s-user text-warning"
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <KPIContainer
                    title="Total Groups"
                    fetchData={fetchTotalGroups}
                    statsType="groupStats"
                    total="groupsTotal"
                    icon="pe-7s-users text-info"
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <KPIContainer
                    title="Total Meetings"
                    fetchData={fetchTotalMeetings}
                    statsType="meetingStats"
                    total="meetingsTotal"
                    icon="pe-7s-graph1 text-danger"
                  />
                </Col>
                <Col lg={3} sm={6}>
                  <KPIContainer
                    title="Total Shares"
                    fetchData={fetchTotalShares}
                    statsType="financeStats"
                    total="sharesTotal"
                    icon="pe-7s-graph1 text-danger"
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={4} sm={6}>
                  <GroupTotalLineChartContainer
                    title="Total Users"
                    fetchData={fetchUsersLastYear}
                    statsType="userStats"
                    dataType="usersLastYear"
                    xLabel="Months"
                    yLabel="Users"
                    stroke="#ff0000"
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <GroupTotalLineChartContainer
                    title="Total Groups"
                    fetchData={fetchGroupsLastYear}
                    statsType="groupsStats"
                    dataType="groupsLastYear"
                    xLabel="Months"
                    yLabel="Groups"
                    stroke="#228b22"
                  />
                </Col>
                <Col lg={4} sm={6}>
                  <MeetingTotalLineChartContainer
                    title="Total Meetings"
                    fetchData={fetchMeetingsLastYear}
                    statsType="meetingsStats"
                    dataType="meetingsLastYear"
                    xLabel="Months"
                    yLabel="Meetings"
                    stroke="#2196f3"
                  />
                </Col>
              </Row>

              <Row>
                <Col lg={4} sm={6}>
                  <GroupLastMonthBarChartContainer />
                </Col>
                <Col lg={4} sm={6}>
                  <UserGenderPieChartContainer />
                </Col>
                <Col lg={4} sm={6}>
                  <UserLastYearBarChartContainer />
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
