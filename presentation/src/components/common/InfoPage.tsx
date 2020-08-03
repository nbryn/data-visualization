import React, { ReactElement } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
const {
    Col,
    Panel,
    Row,
    ControlLabel,
    ListGroup,
    ListGroupItem,
} = require('react-bootstrap');

type Props = {
    groupData: any;
    columns: any;
    column1: any;
    column2: any;
};

const InfoPage: React.FC<Props> = ({
    groupData,
    columns,
    column1,
    column2,
}: Props): ReactElement => {
    let groupDataIndex: number = 0;

    return (
        <div>
            <Row>
                <hr className="groupview-line" />
                <h3 className="groupview-header"></h3>
                <br />
                <div className="group-view-col">
                    <div className="col-md-2">
                        <Col md={3} lg={3}>
                            <Panel>
                                {column1.map((prop: any, index: number) => (
                                    <div key={index} className="group-view-row">
                                        <ListGroup>
                                            <ControlLabel>{prop}</ControlLabel>
                                            <ListGroupItem>
                                                {groupData[groupDataIndex++]}
                                            </ListGroupItem>
                                        </ListGroup>
                                    </div>
                                ))}
                            </Panel>
                        </Col>
                    </div>

                    <div className="col-md-2">
                        <Col md={3} lg={3}>
                            <Panel>
                                {column2.map((prop: any, index: number) => (
                                    <div key={index} className="group-view-row">
                                        <ListGroup>
                                            <ControlLabel>{prop}</ControlLabel>
                                            <ListGroupItem>
                                                {groupData[groupDataIndex++]}
                                            </ListGroupItem>
                                        </ListGroup>
                                    </div>
                                ))}
                            </Panel>
                        </Col>
                    </div>
                </div>

                <Col md={3} lg={3}>
                    <Row>
                        <BootstrapTable
                            keyField="id"
                            data={groupData[groupData.length - 1]}
                            columns={columns}
                            // @ts-ignore
                            pagination={paginationFactory()}
                        />
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default InfoPage;
