import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';

import {
    ChartjsBarChartContainer,
    ChartjsLineChartContainer,
} from '../../containers';
import * as ChartjsThunks from '../../thunks/ChartjsThunks';
import Header from '../../components/navigation/Header';
import Sidebar from '../../components/navigation/Sidebar';

const { Col, Row } = require('react-bootstrap');

const MainView: React.FC = (): ReactElement => {
    const dispatch = useDispatch();

    dispatch(ChartjsThunks.updateChartjsData());

    return (
        <div className="wrapper">
            <Sidebar />
            <div id="main-panel" className="main-panel">
                <Header title="Chartjs Dashboard" />
                <div className="content">
                    <div className="container">
                        <Row>
                            <Col lg={6} sm={6}>
                                <ChartjsLineChartContainer 
                                title="Users"
                                dataTypes={[
                                    'usersLastWeekLineChart',
                                    'usersLastMonthLineChart',
                                    'usersLastYearLineChart',
                                ]}
                                />
                            </Col>
                            <Col lg={6} sm={6}>
                                <ChartjsBarChartContainer
                                    title="Users"
                                    dataTypes={[
                                        'usersLastWeekBarChart',
                                        'usersLastMonthBarChart',
                                        'usersLastYearBarChart',
                                    ]}
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainView;
