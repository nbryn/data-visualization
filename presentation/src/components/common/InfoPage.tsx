import React, { ReactElement } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { makeStyles } from '@material-ui/core/styles';
import paginationFactory from 'react-bootstrap-table2-paginator';

const {
    Col,
    ControlLabel,
    ListGroup,
    ListGroupItem,
} = require('react-bootstrap');

const useStyles = makeStyles((theme) => ({
    header: {
        width: '50%',
        textAlign: 'center',
    },
    line: {
        border: 'solid 1px',
        marginLeft: 0,
    },
    box: {
        height: 400,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'column',
    },
}));

type Props = {
    groupData: any;
    columns: any;
    column1: string[];
   
};

const InfoPage: React.FC<Props> = ({
    groupData,
    columns,
    column1,
}: Props): ReactElement => {
    const classes = useStyles();
    let groupDataIndex: number = 0;

    return (
        <>
            <hr className={classes.line} />
            <h3 className={classes.header}>Group Info</h3>
            <br />

            <Col lg={4} md={6} className={classes.box}>
                {column1.map((prop: any, index: number) => (
                    <div key={index}>
                        <ListGroup>
                            <ControlLabel>{prop}</ControlLabel>
                            <ListGroupItem>
                                {groupData[groupDataIndex++]}
                            </ListGroupItem>
                        </ListGroup>
                    </div>
                ))}
            </Col>

            <Col lg={2} md={6} sm={10}>
                <BootstrapTable
                    keyField="id"
                    data={groupData[groupData.length - 1]}
                    columns={columns}
                    // @ts-ignore
                    pagination={paginationFactory()}
                />
            </Col>
        </>
    );
};

export default InfoPage;
