import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import {
    ChartjsBarChartContainer,
    ChartjsLineChartContainer,
    ChartjsPieChartContainer,
    KPIContainer,
} from '../../containers';
import * as ChartjsThunks from '../../thunks/ChartjsThunks';
import Header from '../../components/navigation/Header';
import Sidebar from '../../components/navigation/Sidebar';

import MixedChart from '../../components/chartjs/MixedChart';

const { Col, Grid, Row } = require('react-bootstrap');

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
                            <Col lg={4} sm={6}>
                                <ChartjsLineChartContainer
                                    title="Users"
                                    dataTypes={[
                                        'usersLastWeekLineChart',
                                        'usersLastMonthLineChart',
                                        'usersLastYearLineChart',
                                    ]}
                                />
                            </Col>
                            <Col lg={4} sm={6}>
                                <ChartjsBarChartContainer
                                    title="Users"
                                    dataTypes={[
                                        'usersLastWeekBarChart',
                                        'usersLastMonthBarChart',
                                        'usersLastYearBarChart',
                                    ]}
                                />
                            </Col>

                            <Col lg={4} sm={6}>
                                <ChartjsPieChartContainer
                                    title="Gender Distribution"
                                    dataType="genderData"
                                    backgroundColor={[
                                        '#FF6384',
                                        '#36A2EB',
                                        '#FFCE56',
                                    ]}
                                    hoverBackgroundColor={[
                                        '#FF6384',
                                        '#36A2EB',
                                        '#FFCE56',
                                    ]}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col lg={4} sm={6}>
                                <MixedChart
                                    labels={[
                                        'January',
                                        'February',
                                        'March',
                                        'April',
                                        'May',
                                        'June',
                                        'July',
                                    ]}
                                    firstChart={{
                                        label: 'Meetings',
                                        type: 'line',
                                        data: [
                                            0,
                                            112,
                                            500,
                                            1200,
                                            2100,
                                            2400,
                                            3200,
                                        ],
                                        fill: false,
                                        borderColor: '#008000',
                                        backgroundColor: '#008000',
                                        pointBorderColor: '#008000',
                                        pointBackgroundColor: '#008000',
                                        pointHoverBackgroundColor: '#008000',
                                        pointHoverBorderColor: '#008000',
                                    }}
                                    secondChart={{
                                        label: 'ETB',
                                        type: 'line',
                                        data: [
                                            0,
                                            2500,
                                            3777,
                                            5111,
                                            6212,
                                            7927,
                                            12234,
                                        ],
                                        fill: false,
                                        backgroundColor: '#0000ff',
                                        borderColor: '#ff0000',
                                        pointBorderColor: '#ff0000',
                                        pointBackgroundColor: '#ff0000',
                                        pointHoverBackgroundColor: '#ff0000',
                                        pointHoverBorderColor: '#ff0000',
                                    }}
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
