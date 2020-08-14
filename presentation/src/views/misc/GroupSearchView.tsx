import {useDispatch, useSelector} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import {ColumnDescription} from 'react-bootstrap-table-next';
import {makeStyles} from '@material-ui/core/styles';
import React, {ReactElement, useState} from 'react';

import * as GroupThunks from '../../thunks/GroupThunks';
import {GroupDataProp} from '../../store/datamodels/Group';
import {infoPageColumn} from '../../util/InfoPageGroupColumns';
import Header from '../../components/navigation/Header';
import InfoPage from '../../components/common/InfoPage';
import {RootState} from '../../store/index';
import Sidebar from '../../components/navigation/Sidebar';

const {Col, Grid, Row, Button, ControlLabel, FormGroup, FormControl} = require('react-bootstrap');

const useStyles = makeStyles((theme) => ({
    search: {
        marginLeft: -15,
    },
}));

const GroupSearchView: React.FC = (): ReactElement => {
    const classes = useStyles();

    const [loading, setLoading] = useState<boolean>(false);
    const [searchString, setSearchString] = useState<string>('');

    const searchData: GroupDataProp = useSelector<RootState, GroupDataProp>((state) => state.groups.searchData);

    const dispatch = useDispatch();

    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        setLoading(true);

        await dispatch(GroupThunks.updateGroupSearchData(`"${searchString}"`));

        setLoading(false);
    };

    const columns: ColumnDescription[] = [
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
                            <Col lg={2} sm={3} className={classes.search}>
                                <form onSubmit={onSubmit}>
                                    <FormGroup controlId="formSearch">
                                        <ControlLabel>Search</ControlLabel>
                                        <FormControl
                                            type="text"
                                            placeholder="Group Name"
                                            name="searchString"
                                            value={searchString}
                                            onChange={(event: React.ChangeEvent) => {
                                                const element = event.currentTarget as HTMLInputElement;
                                                setSearchString(element.value);
                                            }}
                                        />
                                    </FormGroup>
                                    <Button variant="primary" type="submit">
                                        Go!
                                    </Button>
                                </form>
                            </Col>
                        </Row>
                        <Row>
                            {loading && <CircularProgress className="spinner" />}
                            {searchData.length > 0 && (
                                <InfoPage data={searchData} title="Group Info" columns={columns} column1={infoPageColumn} />
                            )}
                        </Row>
                    </Grid>
                </div>
            </div>
        </div>
    );
};

export default GroupSearchView;
