import React, {ReactElement} from 'react';
import BootstrapTable, {ColumnDescription} from 'react-bootstrap-table-next';
import {makeStyles} from '@material-ui/core/styles';
import paginationFactory from 'react-bootstrap-table2-paginator';

const {Col, ControlLabel, ListGroup, ListGroupItem} = require('react-bootstrap');

const useStyles = makeStyles((theme) => ({
    header: {
        width: '50%',
        textAlign: 'center',
    },
    line: {
        border: 'solid 1px',
        marginLeft: -15,
        width: '105%',
    },
    box: {
        height: 400,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
    },
    listGroup: {
        width: 125,
        marginLeft: -5,
    },
}));

type Props = {
    data: Array<any>;
    title: string;
    columns: ColumnDescription[];
    column1: string[];
};

const InfoPage: React.FC<Props> = ({data, title, columns, column1}: Props): ReactElement => {
    const classes = useStyles();
    let dataIndex: number = 0;

    return (
        <>
            <hr className={classes.line} />
            <h3 className={classes.header}>{title}</h3>
            <br />

            <Col lg={4} md={6} className={classes.box}>
                {column1.map((prop: any, index: number) => (
                    <div key={index}>
                        <ListGroup className={classes.listGroup}>
                            <ControlLabel>{prop}</ControlLabel>
                            <ListGroupItem>{data[dataIndex++]}</ListGroupItem>
                        </ListGroup>
                    </div>
                ))}
            </Col>

            <Col lg={2} md={6} sm={10}>
                <BootstrapTable
                    keyField="id"
                    data={data[data.length - 1]}
                    columns={columns}
                    // @ts-ignore
                    pagination={paginationFactory()}
                />
            </Col>
        </>
    );
};

export default InfoPage;
