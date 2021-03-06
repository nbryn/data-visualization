import {useDispatch} from 'react-redux';
import React, {ReactElement} from 'react';

import {AccountData, Model} from '../../store/datamodels/types';
import * as Thunks from '../../thunks/Thunks';
import {BarChartContainer, KPIContainer, LineChartContainer} from '../../containers';
import Header from '../../components/navigation/Header';
import Sidebar from '../../components/navigation/Sidebar';

const {Col, Grid, Row} = require('react-bootstrap');

const AccountView: React.FC = (): ReactElement => {
   const dispatch = useDispatch();

   dispatch(Thunks.updateAccountViewData());

   return (
      <div className="wrapper">
         <Sidebar />
         <div id="main-panel" className="main-panel">
            <Header title="Account" />
            <div className="content">
               <Grid fluid>
                  <Row>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Total Events"
                           data={{model: Model.Account, modelData: AccountData.EventTotal}}
                           icon="pe-7s-users text-info"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Total Meetings"
                           data={{model: Model.Account, modelData: AccountData.MeetingTotal}}
                           icon="pe-7s-graph1 text-danger"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Dollars Per Event"
                           data={{model: Model.Account, modelData: AccountData.DollarEventCount}}
                           icon="pe-7s-wallet text-success"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Most Meetings"
                           data={{model: Model.Account, modelData: AccountData.MostMeetings}}
                           icon="pe-7s-wallet text-success"
                        />
                     </Col>
                  </Row>

                  <Row>
                     <Col lg={4} sm={6}>
                        <LineChartContainer
                           title="Total Events"
                           dataType={{
                              model: Model.Account,
                              modelData: AccountData.EventsLastYearLineChartData,
                           }}
                           xLabel="Months"
                           yLabel="Events"
                           color="#228b22"
                        />
                     </Col>
                     <Col lg={4} sm={6}>
                        <BarChartContainer
                           title="Most Meetings"
                           dataType={{model: Model.Account, modelData: AccountData.MeetingsPerTeam}}
                           xLabel="Team Name"
                           yLabel="Meetings"
                           color="#1828E8"
                        />
                     </Col>
                     <Col lg={4} sm={6}>
                        <BarChartContainer
                           title="Team Dollar Data"
                           dataType={{model: Model.Account, modelData: AccountData.TeamDollarEventData}}
                           xLabel="Team Name"
                           yLabel="Amount"
                           color="#2196f3"
                        />
                     </Col>
                  </Row>

                  <Row>
                     <Col lg={4} sm={6}>
                        <BarChartContainer
                           title="Events Per Month"
                           dataType={{
                              model: Model.Account,
                              modelData: AccountData.EventsLastYearBarChartData,
                           }}
                           xLabel="Month"
                           yLabel="Events"
                           color="#8918E8"
                        />
                     </Col>
                     <Col lg={4} sm={6}>
                        <BarChartContainer
                           title="Events Per Day"
                           dataType={{model: Model.Account, modelData: AccountData.EventsLastMonthData}}
                           xLabel="Day"
                           yLabel="events"
                           color="#ff0000"
                        />
                     </Col>
                     <Col lg={4} sm={6}>
                        <BarChartContainer
                           title="Currencies"
                           dataType={{model: Model.Account, modelData: AccountData.CurrencyData}}
                           color="#2196f3"
                           xLabel="Currency"
                           yLabel="Amount"
                        />
                     </Col>
                  </Row>
               </Grid>
            </div>
         </div>
      </div>
   );
};

export default AccountView;
