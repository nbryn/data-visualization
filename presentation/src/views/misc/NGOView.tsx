import BootstrapTable, {SelectRowProps} from 'react-bootstrap-table-next';
import CircularProgress from '@material-ui/core/CircularProgress';
import {ColumnDescription} from 'react-bootstrap-table-next';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import React, {ReactElement, useEffect, useState} from 'react';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';

import * as GroupThunks from '../../thunks/GroupThunks';
import {GroupData} from '../../store/datamodels/Group';
import {GroupDataProp} from '../../store/datamodels/Group';
import {infoPageColumn} from '../../util/InfoPageGroupColumns';
import Header from '../../components/navigation/Header';
import InfoPage from '../../components/common/InfoPage';
import {RootState} from '../../store/index';
import Sidebar from '../../components/navigation/Sidebar';

const {Col, Grid, Row} = require('react-bootstrap');

const useStyles = makeStyles((theme) => ({
    search: {
        marginTop: -35,
    },
}));

const NGOView: React.FC = (): ReactElement => {
    const classes = useStyles();

    const [selectedGroupData, setSelectedGroupData] = useState<GroupDataProp>([]);

    const data: GroupData[] = useSelector<RootState, GroupData[]>((state) => state.groups.ngoGroupData);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GroupThunks.updateNGOGroupsData('"FHIDO"'));
    }, []);

    const {SearchBar} = Search;

    const selectRow: SelectRowProps<GroupData> = {
        mode: 'radio',
        clickToSelect: true,
        style: {backgroundColor: '#c8e6c9'},
        onSelect: (row: GroupData) => {
            const data: GroupDataProp = [];
            for (let key in row) {
                if (key !== 'id' && key !== 'name') data.push(row[key]);
            }
            setSelectedGroupData(data);
        },
    };

    const columnsInfoPageMembers: ColumnDescription[] = [
        {
            dataField: 'name',
            text: 'Members',
        },
    ];

    const columns: ColumnDescription[] = [
        {
            dataField: 'name',
            text: 'Name',
        },

        {
            dataField: 'admin',
            text: 'Admin',
        },
        {
            dataField: 'owner',
            text: 'Owner',
        },
    ];

    return (
        <div className="wrapper">
            <Sidebar />

            <div id="main-panel" className="main-panel">
                <Header title="NGOView" />
                <div className="content">
                    <Grid fluid>
                        <Row>
                            <Col className={classes.search}>
                                <ToolkitProvider
                                    keyField="name"
                                    data={data}
                                    columns={columns}
                                    // @ts-ignore
                                    striped
                                    hover
                                    condensed
                                    search
                                >
                                    {(props: any) => (
                                        <>
                                            <h4>
                                                <b>Groups</b>
                                            </h4>
                                            <Row>
                                                <Col lg={10} md={8} sm={6}>
                                                    <SearchBar {...props.searchProps} placeholder="Search" />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col lg={6} md={6} sm={6}>
                                                    <BootstrapTable
                                                        {...props.baseProps}
                                                        keyField="id"
                                                        data={data}
                                                        columns={columns}
                                                        selectRow={selectRow}
                                                        // @ts-ignore
                                                        pagination={paginationFactory()}
                                                    />
                                                </Col>
                                            </Row>
                                        </>
                                    )}
                                </ToolkitProvider>
                            </Col>
                        </Row>
                        <Row>
                            {data.length === 0 && <CircularProgress />}
                            {selectedGroupData.length > 0 && (
                                <InfoPage
                                    data={selectedGroupData}
                                    title="Group Info"
                                    columns={columnsInfoPageMembers}
                                    column1={infoPageColumn}
                                />
                            )}
                        </Row>
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default NGOView;
