import BootstrapTable from 'react-bootstrap-table-next';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useDispatch, useSelector } from 'react-redux';
import React, { ReactElement, useEffect, useState } from 'react';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

import * as GroupThunks from '../../thunks/GroupThunks';

import {
    infoPageColumn1,
    infoPageColumn2,
    infoPageColumn3,
} from '../../util/InfoPageGroupColumns';
import Header from '../../components/navigation/Header';
import InfoPage from '../../components/common/InfoPage';
import Sidebar from '../../components/navigation/Sidebar';

import { RootState } from '../../store/index';

const { Grid, Row } = require('react-bootstrap');

const NGOView: React.FC = (): ReactElement => {
    const [allGroupData, setAllGroupData] = useState<any>([]);
    const [selectedGroupData, setSelectedGroupData] = useState<any>([]);

    const data: any = useSelector<RootState, any>(
        (state) => state.groups.ngoGroupData
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GroupThunks.setNGOGroupsData('"FHIDO"'));
    }, []);

    useEffect(() => {
        let id = 0;
        const newState = data.map((element: any) => {
            return {
                id: id++,
                ...element,
                admin: element.admin.firstName + ' ' + element.admin.lastName,
                owner: element.owner.firstName + ' ' + element.owner.lastName,
                members: element.members.map((member: any) => {
                    return {
                        name: member.firstName + ' ' + member.lastName,
                    };
                }),
            };
        });

        setAllGroupData(newState);
    }, [data]);

    const { SearchBar } = Search;

    const selectRow = {
        mode: 'radio',
        clickToSelect: true,
        style: { backgroundColor: '#c8e6c9' },
        onSelect: (row: any, isSelect: boolean, rowIndex: number, e: any) => {
            const data = [];
            for (let key in row) {
                if (key !== 'id') data.push(row[key]);
            }

            setSelectedGroupData(data);
        },
    };

    const columnsInfoPageMembers = [
        {
            dataField: 'name',
            text: 'Members',
        },
    ];

    const columns = [
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
                    <div className="all-groups">
                        <Grid fluid>
                            <Row>
                                <div className="col-md-5">
                                    <ToolkitProvider
                                        keyField="name"
                                        data={allGroupData}
                                        columns={columns}
                                        // @ts-ignore
                                        striped
                                        hover
                                        condensed
                                        search
                                    >
                                        {(props: any) => (
                                            <div>
                                                <h4>
                                                    <b>Groups</b>
                                                </h4>
                                                <SearchBar
                                                    {...props.searchProps}
                                                    placeholder="Search"
                                                />
                                                <BootstrapTable
                                                    {...props.baseProps}
                                                    keyField="id"
                                                    data={allGroupData}
                                                    columns={columns}
                                                    selectRow={selectRow}
                                                    // @ts-ignore
                                                    pagination={paginationFactory()}
                                                />
                                            </div>
                                        )}
                                    </ToolkitProvider>
                                </div>
                            </Row>
                            {allGroupData.length === 0 && <CircularProgress />}
                            {selectedGroupData.length > 0 && (
                                <InfoPage
                                    groupData={selectedGroupData}
                                    columns={columnsInfoPageMembers}
                                    column1={infoPageColumn1}
                                    column2={infoPageColumn2}
                                    column3={infoPageColumn3}
                                />
                            )}
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NGOView;
