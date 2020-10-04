import {useDispatch} from 'react-redux';
import React, {ReactElement} from 'react';

import {Model, TeamData} from '../../store/datamodels/types';
import {
   BarChartContainer,
   KPIContainer,
   KPITodayContainer,
   LineChartContainer,
   PieChartContainer,
} from '../../containers';
import * as Thunks from '../../thunks/TeamThunks';
import Header from '../../components/navigation/Header';
import Sidebar from '../../components/navigation/Sidebar';

const {Col, Grid, Row} = require('react-bootstrap');

const TeamView: React.FC = (): ReactElement => {
   const dispatch = useDispatch();

   dispatch(Thunks.updateTeamViewData());

   return (
      <div className="wrapper">
         <Sidebar />
         <div id="main-panel" className="main-panel">
            <Header title="Teams" />
            <div className="content">
               <Grid fluid>
                  <Row>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Total Teams"
                           data={{model: Model.Team, modelData: TeamData.Total}}
                           icon="pe-7s-graph1 text-danger"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPITodayContainer
                           data={{model: Model.Team, modelData: TeamData.TodayCount}}
                           dateData={TeamData.TodayCount}
                           icon="pe-7s-graph1 text-danger"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Last Year"
                           data={{model: Model.Team, modelData: TeamData.LastYearCount}}
                           icon="pe-7s-graph1 text-danger"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Last Month"
                           data={{model: Model.Team, modelData: TeamData.LastMonthCount}}
                           icon="pe-7s-users text-info"
                        />
                     </Col>
                  </Row>

                  <Row>
                     <Col lg={4} sm={6}>
                        <LineChartContainer
                           title="Total Teams"
                           statsType="teams"
                           dataType="lastYearLineChartData"
                           xLabel="Months"
                           yLabel="Teams"
                           color="#228b22"
                        />
                     </Col>
                     <Col lg={4} sm={6}>
                        <BarChartContainer
                           title="Teams Per Country"
                           statsType="teams"
                           dataType="perCountryData"
                           xLabel="Country"
                           yLabel="Teams"
                           color="#1828E8"
                        />
                     </Col>
                     <Col lg={4} sm={6}>
                        <BarChartContainer
                           title="Teams Per Org"
                           statsType="teams"
                           dataType="perOrgData"
                           xLabel="Org"
                           yLabel="Teams"
                           color="#ff0000"
                        />
                     </Col>
                  </Row>
                  <Row>
                     <Col lg={4} sm={6}>
                        <BarChartContainer
                           title="Teams Last Month"
                           statsType="teams"
                           dataType="lastMonthBarChartData"
                           xLabel="Day"
                           yLabel="Teams"
                           color="#228b22"
                        />
                     </Col>
                     <Col lg={4} sm={6}>
                        <PieChartContainer
                           title="Team Size"
                           statsType="teams"
                           dataType="teamSizeStats"
                           colors={['#a4de6c', '#67b6ed', '#8884d8', '#ff0000', '#2196f3', '#228b22']}
                        />
                     </Col>
                     <Col lg={4} sm={6}>
                        <BarChartContainer
                           title="Teams Last Year"
                           statsType="teams"
                           dataType="lastYearBarChartData"
                           xLabel="Month"
                           yLabel="Teams"
                           color="#2196f3"
                        />
                     </Col>
                  </Row>
               </Grid>
            </div>
         </div>
      </div>
   );
};

export default TeamView;
