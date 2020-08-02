import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { ReactElement, useEffect, useState } from 'react';

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

const {
    Grid,
    Row,
    Button,
    ControlLabel,
    FormGroup,
    FormControl,
} = require('react-bootstrap');

const GroupSearchView: React.FC = (): ReactElement => {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<any>([]);
    const [searchString, setSearchString] = useState<string>('');

    const searchData: any = useSelector<RootState, any>(
        (state) => state.groups.searchData
    );

    const dispatch = useDispatch();

    useEffect(() => {
        const groupData = Object.keys(searchData).map((info: string) => {
            if (info === 'owner') {
                return (
                    searchData[info].firstName +
                    ' ' +
                    searchData!.owner.lastName
                );
            } else if (info === 'admin') {
                return (
                    searchData[info].firstName + ' ' + searchData.admin.lastName
                );
            } else if (info === 'members') {
                return searchData[info].map((member: any) => {
                    return {
                        name: member.firstName + ' ' + member.lastName,
                    };
                });
            } else {
                return searchData![info];
            }
        });

        setData(groupData);
        setLoading(false);
    }, [searchData, data]);

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setLoading(true);

        dispatch(GroupThunks.setGroupSearchData(`"${searchString}"`));
    };

    const onChange = (event: React.ChangeEvent) => {
        const element = event.currentTarget as HTMLInputElement;
        setSearchString(element.value);
    };

    const columns = [
        {
            dataField: 'name',
            text: 'Members',
        },
    ];

    return (
        <div className="wrapper">
            <Sidebar />

            <div id="main-panel" className="main-panel">
                <Header title="Group Search" />
                <div className="content">
                    <Grid fluid>
                        <Row>
                            <div className="search-field">
                                <form onSubmit={onSubmit}>
                                    <FormGroup controlId="formSearch">
                                        <ControlLabel>Search</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Group Name"
                                            name="searchString"
                                            value={searchString}
                                            onChange={onChange}
                                        />
                                    </FormGroup>
                                    <Button variant="primary" type="submit">
                                        Go!
                                    </Button>
                                </form>
                            </div>
                            {loading && (
                                <CircularProgress className="spinner" />
                            )}
                            {data.length > 0 && (
                                <InfoPage
                                    groupData={data}
                                    columns={columns}
                                    column1={infoPageColumn1}
                                    column2={infoPageColumn2}
                                    column3={infoPageColumn3}
                                />
                            )}
                        </Row>
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default GroupSearchView;
