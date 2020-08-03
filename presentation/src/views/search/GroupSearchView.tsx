import { useDispatch, useSelector } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { ReactElement, useState } from 'react';

import * as GroupThunks from '../../thunks/GroupThunks';
import {
    infoPageColumn1,
    infoPageColumn2,
} from '../../util/InfoPageGroupColumns';
import Header from '../../components/navigation/Header';
import InfoPage from '../../components/common/InfoPage';
import { RootState } from '../../store/index';
import Sidebar from '../../components/navigation/Sidebar';

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
    const [searchString, setSearchString] = useState<string>('');

    const searchData: any = useSelector<RootState, any>(
        (state) => state.groups.searchData
    );

    const dispatch = useDispatch();

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setLoading(true);

        await dispatch(GroupThunks.setGroupSearchData(`"${searchString}"`));

        setLoading(false);
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
                                            onChange={(
                                                event: React.ChangeEvent
                                            ) => {
                                                const element = event.currentTarget as HTMLInputElement;
                                                setSearchString(element.value);
                                            }}
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
                            {searchData.length > 0 && (
                                <InfoPage
                                    groupData={searchData}
                                    columns={columns}
                                    column1={infoPageColumn1}
                                    column2={infoPageColumn2}
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
