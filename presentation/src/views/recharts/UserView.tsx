import {useDispatch} from 'react-redux';
import React, {ReactElement} from 'react';

import {BarChartContainer, KPITodayContainer, KPIContainer, LineChartContainer, PieChartContainer} from '../../containers';
import * as UserThunks from '../../thunks/UserThunks';
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
                                    statsType="users"
                                    total="total"
                                    icon="pe-7s-user text-warning"
                                />
                            </Col>
                            <Col lg={3} sm={6}>
                                <KPITodayContainer
                                    statsType="users"
                                    countData="todayCount"
                                    dateData="todayDate"
                                    icon="pe-7s-users text-info"
                                />
                            </Col>
                            <Col lg={3} sm={6}>
                                <KPIContainer
                                    title="Last Year"
                                    statsType="users"
                                    total="lastYearCount"
                                    icon="pe-7s-wallet text-success"
                                />
                            </Col>
                            <Col lg={3} sm={6}>
                                <KPIContainer
                                    title="Last Month"
                                    statsType="users"
                                    total="lastMonthCount"
                                    icon="pe-7s-users text-info"
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={4} sm={6}>
                                <LineChartContainer
                                    title="Total Users"
                                    statsType="users"
                                    dataType="lastYearLineChartData"
                                    xLabel="Months"
                                    yLabel="Users"
                                    color="#ff0000"
                                />
                            </Col>
                            <Col lg={4} sm={6}>
                                <BarChartContainer
                                    title="Users Per Country"
                                    statsType="users"
                                    dataType="perCountryData"
                                    xLabel="Country"
                                    yLabel="Users"
                                    color="#1828E8"
                                />
                            </Col>
                            <Col lg={4} sm={6}>
                                <BarChartContainer
                                    title="Users Per NGO"
                                    statsType="users"
                                    dataType="perNGOData"
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
                                    statsType="users"
                                    dataType="lastMonthBarChartData"
                                    xLabel="Day"
                                    yLabel="Users"
                                    color="#228b22"
                                />
                            </Col>
                            <Col lg={4} sm={6}>
                                <PieChartContainer
                                    title="Gender Distribution"
                                    statsType="users"
                                    dataType="genderStats"
                                    colors={['#1828E8', '#228b22']}
                                />
                            </Col>

                            <Col lg={4} sm={6}>
                                <BarChartContainer
                                    title="Users Per Month"
                                    statsType="users"
                                    dataType="lastYearBarChartData"
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
