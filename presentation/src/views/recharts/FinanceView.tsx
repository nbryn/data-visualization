import {useDispatch} from 'react-redux';
import React, {ReactElement} from 'react';

import * as Thunks from '../../thunks/Thunks';
import {BarChartContainer, KPIContainer, LineChartContainer} from '../../containers';
import Header from '../../components/navigation/Header';
import Sidebar from '../../components/navigation/Sidebar';

const {Col, Grid, Row} = require('react-bootstrap');

const FinanceView: React.FC = (): ReactElement => {
   const dispatch = useDispatch();

   dispatch(Thunks.updateFinanceViewData());

   return (
      <div className="wrapper">
         <Sidebar />
         <div id="main-panel" className="main-panel">
            <Header title="Finance" />
            <div className="content">
               <Grid fluid>
                  <Row>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Total Events"
                           statsType="finance"
                           total="eventTotal"
                           icon="pe-7s-users text-info"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Total Meetings"
                           statsType="finance"
                           total="meetingTotal"
                           icon="pe-7s-graph1 text-danger"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="ETB Per Event"
                           statsType="finance"
                           total="etbEventCount"
                           icon="pe-7s-wallet text-success"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Most Meetings"
                           statsType="finance"
                           total="mostMeetings"
                           icon="pe-7s-wallet text-success"
                        />
                     </Col>
                  </Row>

                  <Row>
                     <Col lg={4} sm={6}>
                        <LineChartContainer
                           title="Total Events"
                           statsType="finance"
                           dataType="eventsLastYearLineChartData"
                           xLabel="Months"
                           yLabel="Events"
                           color="#228b22"
                        />
                     </Col>
                     <Col lg={4} sm={6}>
                        <BarChartContainer
                           title="Most Meetings"
                           statsType="finance"
                           dataType="meetingsPerTeam"
                           xLabel="Team Name"
                           yLabel="Meetings"
                           color="#1828E8"
                        />
                     </Col>
                     <Col lg={4} sm={6}>
                        <BarChartContainer
                           title="Team ETB Data"
                           statsType="finance"
                           dataType="teamETBEventData"
                           xLabel="Group Name"
                           yLabel="Amount"
                           color="#2196f3"
                        />
                     </Col>
                  </Row>

                  <Row>
                     <Col lg={4} sm={6}>
                        <BarChartContainer
                           title="Events Per Month"
                           statsType="finance"
                           dataType="eventsLastMonthData"
                           xLabel="Month"
                           yLabel="Events"
                           color="#8918E8"
                        />
                     </Col>
                     <Col lg={4} sm={6}>
                        <BarChartContainer
                           title="Events Per Day"
                           statsType="finance"
                           dataType="eventsLastMonthData"
                           xLabel="Day"
                           yLabel="events"
                           color="#ff0000"
                        />
                     </Col>
                     <Col lg={4} sm={6}>
                        <BarChartContainer
                           title="Currencies"
                           statsType="finance"
                           dataType="currencyData"
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

export default FinanceView;
