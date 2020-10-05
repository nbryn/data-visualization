import React, {ReactElement} from 'react';
import {useDispatch} from 'react-redux';

import {BarChartContainer, KPIContainer, LineChartContainer, PieChartContainer} from '../../containers';
import {MainData, Model} from '../../store/datamodels/types';
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
                           data={{model: Model.Main, modelData: MainData.UsersTotal}}
                           icon="pe-7s-user text-warning"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Total Teams"
                           data={{model: Model.Main, modelData: MainData.TeamsTotal}}
                           icon="pe-7s-users text-info"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Total Matches"
                           data={{model: Model.Main, modelData: MainData.MatchTotal}}
                           icon="pe-7s-graph1 text-danger"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Total Meetings"
                           data={{model: Model.Main, modelData: MainData.MeetingTotal}}
                           icon="pe-7s-graph1 text-danger"
                        />
                     </Col>
                  </Row>

                  <Row>
                     <Col lg={4} md={6}>
                        <LineChartContainer
                           title="Total Users"
                           dataType={{model: Model.Main, modelData: MainData.UsersLastYearLineChartData}}
                           xLabel="Month"
                           yLabel="Users"
                           color="#ff0000"
                        />
                     </Col>
                     <Col lg={4} md={6}>
                        <LineChartContainer
                           title="Total Teams"
                           dataType={{model: Model.Main, modelData: MainData.TeamsLastYearData}}
                           xLabel="Month"
                           yLabel="Teams"
                           color="#228b22"
                        />
                     </Col>
                     <Col lg={4} md={6}>
                        <LineChartContainer
                           title="Total Matches"
                           dataType={{model: Model.Main, modelData: MainData.MatchesLastYearData}}
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
                           dataType={{model: Model.Main, modelData: MainData.TeamsLastMonthData}}
                           xLabel="Day"
                           yLabel="Teams"
                           color="#228b22"
                        />
                     </Col>
                     <Col lg={4} md={6}>
                        <PieChartContainer
                           title="Gender Distribution"
                           dataType={{model: Model.Main, modelData: MainData.UserGenderStats}}
                           colors={['#1828E8', '#228b22']}
                        />
                     </Col>
                     <Col lg={4} md={6}>
                        <BarChartContainer
                           title="Users Last Year"
                           dataType={{model: Model.Main, modelData: MainData.UsersLastYearBarChartData}}
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
