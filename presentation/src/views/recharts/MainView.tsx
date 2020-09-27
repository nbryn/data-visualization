import React, {ReactElement} from 'react';
import {useDispatch} from 'react-redux';

import {BarChartContainer, KPIContainer, LineChartContainer, PieChartContainer} from '../../containers';
import * as Thunks from '../../thunks/Thunks';
import Header from '../../components/navigation/Header';
import Sidebar from '../../components/navigation/Sidebar';

const {Col, Grid, Row} = require('react-bootstrap');

const MainView: React.FC = (): ReactElement => {
   const dispatch = useDispatch();
   dispatch(Thunks.updateMainViewData());

   return (
      <div className="wrapper">
         <Sidebar />
         <div id="main-panel" className="main-panel">
            <Header title="Overview" />
            <div className="content">
               <Grid fluid>
                  <Row>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Total Users"
                           statsType="main"
                           total="usersTotal"
                           icon="pe-7s-user text-warning"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Total Teams"
                           statsType="main"
                           total="teamsTotal"
                           icon="pe-7s-users text-info"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Total Matches"
                           statsType="main"
                           total="matchTotal"
                           icon="pe-7s-graph1 text-danger"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Total Meetings"
                           statsType="main"
                           total="meetingTotal"
                           icon="pe-7s-graph1 text-danger"
                        />
                     </Col>
                  </Row>

                  <Row>
                     <Col lg={4} md={6}>
                        <LineChartContainer
                           title="Total Users"
                           statsType="main"
                           dataType="usersLastYearLineChartData"
                           xLabel="Month"
                           yLabel="Users"
                           color="#ff0000"
                        />
                     </Col>
                     <Col lg={4} md={6}>
                        <LineChartContainer
                           title="Total Teams"
                           statsType="main"
                           dataType="teamsLastYearData"
                           xLabel="Month"
                           yLabel="Teams"
                           color="#228b22"
                        />
                     </Col>
                     <Col lg={4} md={6}>
                        <LineChartContainer
                           title="Total Matches"
                           statsType="main"
                           dataType="matchesLastYearData"
                           xLabel="Month"
                           yLabel="matches"
                           color="#2196f3"
                        />
                     </Col>
                  </Row>

                  <Row>
                     <Col lg={4} md={6}>
                        <BarChartContainer
                           title="Teams Last Month"
                           statsType="main"
                           dataType="teamsLastMonthData"
                           xLabel="Day"
                           yLabel="Teams"
                           color="#228b22"
                        />
                     </Col>
                     <Col lg={4} md={6}>
                        <PieChartContainer
                           title="Gender Distribution"
                           statsType="main"
                           dataType="userGenderStats"
                           colors={['#1828E8', '#228b22']}
                        />
                     </Col>
                     <Col lg={4} md={6}>
                        <BarChartContainer
                           title="Users Last Year"
                           statsType="main"
                           dataType="usersLastYearBarChartData"
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
};

export default MainView;
