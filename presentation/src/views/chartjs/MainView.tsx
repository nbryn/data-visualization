import React, {ReactElement} from 'react';
import {useDispatch} from 'react-redux';

import {
   ChartjsBarChartContainer,
   ChartjsLineChartContainer,
   ChartjsMixedChartContainer,
   ChartjsPieChartContainer,
   KPIContainer,
} from '../../containers';
import {ChartjsData, Model} from '../../store/datamodels/types';
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
                           data={{model: Model.Chartjs, modelData: ChartjsData.UsersTotal}}
                           icon="pe-7s-user text-warning"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Total Teams"
                           data={{model: Model.Chartjs, modelData: ChartjsData.TeamsTotal}}
                           icon="pe-7s-users text-info"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Total Matches"
                           data={{model: Model.Chartjs, modelData: ChartjsData.MatchTotal}}
                           icon="pe-7s-graph1 text-danger"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Total Meetings"
                           data={{model: Model.Chartjs, modelData: ChartjsData.MeetingTotal}}
                           icon="pe-7s-graph1 text-danger"
                        />
                     </Col>
                  </Row>

                  <Row>
                     <Col lg={4} md={8}>
                        <ChartjsLineChartContainer
                           title="Users"
                           color="#553FBF"
                           data={[
                              ChartjsData.UsersLastWeekLineChart,
                              ChartjsData.UsersLastMonthLineChart,
                              ChartjsData.UsersLastYearLineChart,
                           ]}
                        />
                     </Col>
                     <Col lg={4} md={8}>
                        <ChartjsBarChartContainer
                           title="Users"
                           color="#E6373A"
                           data={[
                              ChartjsData.UsersLastWeekBarChart,
                              ChartjsData.UsersLastMonthBarChart,
                              ChartjsData.UsersLastYearBarChart,
                           ]}
                        />
                     </Col>
                     <Col lg={4} md={8}>
                        <ChartjsMixedChartContainer
                           firstDataType={ChartjsData.UsersLastYearLineChart}
                           firstChartTitle="Users"
                           secondDataType={ChartjsData.TeamsLastYearLineChart}
                           secondChartTitle="Teams"
                        />
                     </Col>
                  </Row>

                  <Row>
                     <Col lg={4} md={8}>
                        <ChartjsLineChartContainer
                           title="Teams"
                           color="#52A5EE"
                           data={[
                              ChartjsData.TeamsLastWeekLineChart,
                              ChartjsData.TeamsLastMonthLineChart,
                              ChartjsData.TeamsLastYearLineChart,
                           ]}
                        />
                     </Col>
                     <Col lg={4} m={8}>
                        <ChartjsBarChartContainer
                           title="Teams"
                           color="#22B324"
                           data={[
                              ChartjsData.TeamsLastWeekBarChart,
                              ChartjsData.TeamsLastMonthBarChart,
                              ChartjsData.TeamsLastYearBarChart,
                           ]}
                        />
                     </Col>

                     <Col lg={4} m={8}>
                        <ChartjsPieChartContainer
                           title="Gender Distribution"
                           dataType={ChartjsData.GenderData}
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
