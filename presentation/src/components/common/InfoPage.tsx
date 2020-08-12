import React, { ReactElement } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { makeStyles } from '@material-ui/core/styles';
import paginationFactory from 'react-bootstrap-table2-paginator';

const {
    Col,
    Grid,
    Panel,
    Row,
    ControlLabel,
    ListGroup,
    ListGroupItem,
} = require('react-bootstrap');

const useStyles = makeStyles((theme) => ({
    header: {
        paddingLeft: 275,
    },
    line: {
        border: 'solid 1px',
        marginLeft: 0,
    },
    col: {
        width: '70%',
        left: 0,
    },
    row: {
        float: 'left',
        left: -10,
    },
}));

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
    const classes = useStyles();
    let groupDataIndex: number = 0;

    return (
        <Grid fluid>
            <Row>
                <hr className={classes.line} />
                <h3 className={classes.header}></h3>
                <br />
                <div className={classes.col}>
                    <div className="col-md-2">
                        <Col lg={3} sm={6}>
                            <Panel>
                                {column1.map((prop: any, index: number) => (
                                    <div key={index} className={classes.row}>
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
                        <Col lg={3} sm={6}>
                            <Panel>
                                {column2.map((prop: any, index: number) => (
                                    <div key={index} className={classes.row}>
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

                <Col lg={3} sm={6}>
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
        </Grid>
    );
};

export default InfoPage;
