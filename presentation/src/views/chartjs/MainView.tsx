import React, { Component } from 'react';

import Header from '../../components/navigation/Header';
import Sidebar from '../../components/navigation/Sidebar';
import { UserLineChartContainer } from '../../containers';

const { Col, Row } = require('react-bootstrap');

class MainView extends Component {
    render() {
        return (
            <div className="wrapper">
                <Sidebar />
                <div id="main-panel" className="main-panel" ref="mainPanel">
                    <Header title="Chartjs Dashboard" />
                    <div className="content">
                        <div className="container">
                            <Row>
                                <Col lg={6} sm={6}>
                                    <UserLineChartContainer />
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainView;
