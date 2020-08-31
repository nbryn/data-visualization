import React, {ReactElement} from 'react';
import {useDispatch} from 'react-redux';

import {
   ChartjsBarChartContainer,
   ChartjsLineChartContainer,
   ChartjsMixedChartContainer,
   ChartjsPieChartContainer,
   KPIContainer,
} from '../../containers';
import * as ChartjsThunks from '../../thunks/ChartjsThunks';
import Header from '../../components/navigation/Header';
import Sidebar from '../../components/navigation/Sidebar';

const {Col, Grid, Row} = require('react-bootstrap');

const MainView: React.FC = (): ReactElement => {
   const dispatch = useDispatch();

   dispatch(ChartjsThunks.updateChartjsData());

   return (
      <div className="wrapper">
         <Sidebar />
         <div id="main-panel" className="main-panel">
            <Header title="Chartjs Dashboard" />
            <div className="content">
               <Grid fluid>
                  <Row>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Total Users"
                           statsType="chartjs"
                           total="usersTotal"
                           icon="pe-7s-user text-warning"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Total Groups"
                           statsType="chartjs"
                           total="groupsTotal"
                           icon="pe-7s-users text-info"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Total Meetings"
                           statsType="chartjs"
                           total="meetingsTotal"
                           icon="pe-7s-graph1 text-danger"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Total Shares"
                           statsType="chartjs"
                           total="sharesTotal"
                           icon="pe-7s-graph1 text-danger"
                        />
                     </Col>
                  </Row>

                  <Row>
                     <Col lg={4} md={8}>
                        <ChartjsLineChartContainer
                           title="Users"
                           color="#553FBF"
                           dataTypes={['usersLastWeekLineChart', 'usersLastMonthLineChart', 'usersLastYearLineChart']}
                        />
                     </Col>
                     <Col lg={4} md={8}>
                        <ChartjsBarChartContainer
                           title="Users"
                           color="#E6373A"
                           dataTypes={['usersLastWeekBarChart', 'usersLastMonthBarChart', 'usersLastYearBarChart']}
                        />
                     </Col>
                     <Col lg={4} md={8}>
                        <ChartjsMixedChartContainer
                           firstDataType="usersLastYearLineChart"
                           firstChartTitle="Users"
                           secondDataType="groupsLastYearLineChart"
                           secondChartTitle="Groups"
                        />
                     </Col>
                  </Row>

                  <Row>
                     <Col lg={4} md={8}>
                        <ChartjsLineChartContainer
                           title="Groups"
                           color="#52A5EE"
                           dataTypes={[
                              'groupsLastWeekLineChart',
                              'groupsLastMonthLineChart',
                              'groupsLastYearLineChart',
                           ]}
                        />
                     </Col>
                     <Col lg={4} m={8}>
                        <ChartjsBarChartContainer
                           title="Groups"
                           color="#22B324"
                           dataTypes={['groupsLastWeekBarChart', 'groupsLastMonthBarChart', 'groupsLastYearBarChart']}
                        />
                     </Col>

                     <Col lg={4} m={8}>
                        <ChartjsPieChartContainer
                           title="Gender Distribution"
                           dataType="genderData"
                           backgroundColor={['#e30c32', '#427d23']}
                           hoverBackgroundColor={['#e30c32', '#427d23']}
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
