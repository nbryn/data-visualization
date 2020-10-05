import {useDispatch} from 'react-redux';
import React, {ReactElement} from 'react';

import {
   BarChartContainer,
   KPITodayContainer,
   KPIContainer,
   LineChartContainer,
   PieChartContainer,
} from '../../containers';
import * as UserThunks from '../../thunks/UserThunks';
import {Model, UserData} from '../../store/datamodels/types';
import Header from '../../components/navigation/Header';
import Sidebar from '../../components/navigation/Sidebar';

const {Col, Grid, Row} = require('react-bootstrap');

const UserView: React.FC = (): ReactElement => {
   const dispatch = useDispatch();

   dispatch(UserThunks.updateUserViewData());

   return (
      <div className="wrapper">
         <Sidebar />
         <div id="main-panel" className="main-panel">
            <Header title="Users" />
            <div className="content">
               <Grid fluid>
                  <Row>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Total Users"
                           data={{model: Model.User, modelData: UserData.Total}}
                           icon="pe-7s-user text-warning"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPITodayContainer
                           data={{model: Model.User, modelData: UserData.TodayCount}}
                           dateData={UserData.TodayDate}
                           icon="pe-7s-users text-info"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Last Year"
                           data={{model: Model.User, modelData: UserData.LastYearCount}}
                           icon="pe-7s-wallet text-success"
                        />
                     </Col>
                     <Col lg={3} sm={6}>
                        <KPIContainer
                           title="Last Month"
                           data={{model: Model.User, modelData: UserData.LastMonthCount}}
                           icon="pe-7s-users text-info"
                        />
                     </Col>
                  </Row>
                  <Row>
                     <Col lg={4} sm={6}>
                        <LineChartContainer
                           title="Total Users"
                           dataType={{model: Model.User, modelData: UserData.LastYearLineChartData}}
                           xLabel="Months"
                           yLabel="Users"
                           color="#ff0000"
                        />
                     </Col>
                     <Col lg={4} sm={6}>
                        <BarChartContainer
                           title="Users Per Country"
                           dataType={{model: Model.User, modelData: UserData.PerCountryData}}
                           xLabel="Country"
                           yLabel="Users"
                           color="#1828E8"
                        />
                     </Col>
                     <Col lg={4} sm={6}>
                        <BarChartContainer
                           title="Users Per Org"
                           dataType={{model: Model.User, modelData: UserData.PerOrgData}}
                           xLabel="NGO"
                           yLabel="Users"
                           color="#2196f3"
                        />
                     </Col>
                  </Row>
                  <Row>
                     <Col lg={4} sm={6}>
                        <BarChartContainer
                           title="Users Per Day"
                           dataType={{model: Model.User, modelData: UserData.LastMonthBarChartData}}
                           xLabel="Day"
                           yLabel="Users"
                           color="#228b22"
                        />
                     </Col>
                     <Col lg={4} sm={6}>
                        <PieChartContainer
                           title="Gender Distribution"
                           dataType={{model: Model.User, modelData: UserData.GenderStats}}
                           colors={['#1828E8', '#228b22']}
                        />
                     </Col>

                     <Col lg={4} sm={6}>
                        <BarChartContainer
                           title="Users Per Month"
                           dataType={{model: Model.User, modelData: UserData.LastYearBarChartData}}
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

export default UserView;
