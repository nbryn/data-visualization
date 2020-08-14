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
                                    title="Total Loans"
                                    statsType="finance"
                                    total="loansTotal"
                                    icon="pe-7s-users text-info"
                                />
                            </Col>
                            <Col lg={3} sm={6}>
                                <KPIContainer
                                    title="Total Shares"
                                    statsType="finance"
                                    total="sharesTotal"
                                    icon="pe-7s-graph1 text-danger"
                                />
                            </Col>
                            <Col lg={3} sm={6}>
                                <KPIContainer
                                    title="ETB On Loan"
                                    statsType="finance"
                                    total="etbOnLoan"
                                    icon="pe-7s-wallet text-success"
                                />
                            </Col>
                            <Col lg={3} sm={6}>
                                <KPIContainer
                                    title="Most Shares"
                                    statsType="finance"
                                    total="mostShares"
                                    icon="pe-7s-wallet text-success"
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={4} sm={6}>
                                <LineChartContainer
                                    title="Total Loans"
                                    statsType="finance"
                                    dataType="loansLastYearLineChartData"
                                    xLabel="Months"
                                    yLabel="Loans"
                                    color="#228b22"
                                />
                            </Col>
                            <Col lg={4} sm={6}>
                                <BarChartContainer
                                    title="Most Shares"
                                    statsType="finance"
                                    dataType="sharesPerGroup"
                                    xLabel="Group Name"
                                    yLabel="Shares"
                                    color="#1828E8"
                                />
                            </Col>
                            <Col lg={4} sm={6}>
                                <BarChartContainer
                                    title="ETB On Loan"
                                    statsType="finance"
                                    dataType="groupEtbLoan"
                                    xLabel="Group Name"
                                    yLabel="Amount"
                                    color="#2196f3"
                                />
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={4} sm={6}>
                                <BarChartContainer
                                    title="Loans Per Month"
                                    statsType="finance"
                                    dataType="loansLastMonthData"
                                    xLabel="Month"
                                    yLabel="Loans"
                                    color="#8918E8"
                                />
                            </Col>
                            <Col lg={4} sm={6}>
                                <BarChartContainer
                                    title="Loans Per Day"
                                    statsType="finance"
                                    dataType="loansLastMonthData"
                                    xLabel="Day"
                                    yLabel="Loans"
                                    color="#ff0000"
                                />
                            </Col>
                            <Col lg={4} sm={6}>
                                <BarChartContainer
                                    title="Currencies"
                                    statsType="finance"
                                    dataType="currencyStats"
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
