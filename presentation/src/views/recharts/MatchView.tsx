import {useDispatch} from 'react-redux';
import React, {ReactElement} from 'react';

import {BarChartContainer, KPIContainer, KPITodayContainer, LineChartContainer} from '../../containers';
import {Model, MatchData} from '../../store/datamodels/types';
import * as Thunks from '../../thunks/Thunks';
import Header from '../../components/navigation/Header';
import Sidebar from '../../components/navigation/Sidebar';

const {Col, Grid, Row} = require('react-bootstrap');

const MatchView: React.FC = (): ReactElement => {
   const dispatch = useDispatch();

   dispatch(Thunks.updateMatchViewData());

   return (
      <div className="wrapper">
         <Sidebar />
         <div id="main-panel" className="main-panel">
            <Header title="Matches" />
            <div className="content">
               <Grid fluid>
                  <Row>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Total Matches"
                           data={{model: Model.Match, modelData: MatchData.TotalData}}
                           icon="pe-7s-user text-warning"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPITodayContainer
                           data={{model: Model.Match, modelData: MatchData.TodayCount}}
                           dateData={MatchData.TodayDate}
                           icon="pe-7s-users text-info"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Last Month"
                           data={{model: Model.Match, modelData: MatchData.LastMonthCount}}
                           icon="pe-7s-graph1 text-danger"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Last Year"
                           data={{model: Model.Match, modelData: MatchData.LastYearCount}}
                           icon="pe-7s-wallet text-success"
                        />
                     </Col>
                  </Row>

                  <Row>
                     <Col lg={4} sm={6}>
                        <LineChartContainer
                           title="Total Matches"
                           statsType="matches"
                           dataType="lastYearData"
                           xLabel="Months"
                           yLabel="Meetings"
                           color="#228b22"
                        />
                     </Col>
                     <Col lg={4} sm={6}>
                        <BarChartContainer
                           title="Matches Per Team"
                           statsType="matches"
                           dataType="perTeamData"
                           xLabel="Team"
                           yLabel="Matches"
                           color="#ff0000"
                        />
                     </Col>
                     <Col lg={4} sm={6}>
                        <BarChartContainer
                           title="Matches Per Country"
                           statsType="matches"
                           dataType="perCountryData"
                           xLabel="Country"
                           yLabel="Meetings"
                           color="#228b22"
                        />
                     </Col>
                  </Row>

                  <Row>
                     <Col lg={4} sm={6}>
                        <BarChartContainer
                           title="Matches Last Month"
                           statsType="matches"
                           dataType="lastMonthBarChartData"
                           xLabel="Day"
                           yLabel="Matches"
                           color="#1828E8"
                        />
                     </Col>

                     <Col lg={4} sm={6}>
                        <BarChartContainer
                           title="Matches Last Year"
                           statsType="matches"
                           dataType="lastYearBarChartData"
                           xLabel="Month"
                           yLabel="Matches"
                           color="#8918E8"
                        />
                     </Col>
                     <Col lg={4} sm={6}>
                        <BarChartContainer
                           title="Matches With Most Meetings"
                           statsType="matches"
                           dataType="meetingsPerMatchData"
                           xLabel="Match"
                           yLabel="Meetings"
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

export default MatchView;
