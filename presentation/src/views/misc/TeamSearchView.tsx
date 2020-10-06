import CircularProgress from '@material-ui/core/CircularProgress';
import {ColumnDescription} from 'react-bootstrap-table-next';
import {makeStyles} from '@material-ui/core/styles';
import React, {ReactElement, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import * as TeamThunks from '../../thunks/TeamThunks';
import Error from '../../util/Error';
import {TeamDataProp} from '../../store/datamodels/Team';
import {infoPageColumn} from '../../util/InfoPageGroupColumns';
import Header from '../../components/navigation/Header';
import InfoPage from '../../components/common/InfoPage';
import {RootState} from '../../store/index';
import Sidebar from '../../components/navigation/Sidebar';

const {Alert, Col, Grid, Row, Button, ControlLabel, FormGroup, FormControl} = require('react-bootstrap');

const useStyles = makeStyles((theme) => ({
   search: {
      marginLeft: -15,
   },
   searchText: {
      fontSize: 20,
      marginBottom: 10,
   },
   groupInfo: {
      marginTop: 30,
   },
   spinner: {
      textAlign: 'center',
   },
}));

const TeamSearchView: React.FC = (): ReactElement => {
   const classes = useStyles();

   const [loading, setLoading] = useState<boolean>(false);
   const [errorMessage, setErrorMessage] = useState<string>('');
   const [searchString, setSearchString] = useState<string>('');

   const searchData: TeamDataProp = useSelector<RootState, TeamDataProp>(
      (state) => state.teams.searchData
   );

   const dispatch = useDispatch();

   const onSubmit = async (event: React.FormEvent): Promise<void> => {
      setErrorMessage('');

      try {
         event.preventDefault();

         setLoading(true);

         await dispatch(TeamThunks.updateTeamSearchData(`"${searchString}"`));

         setLoading(false);
      } catch (error) {
         const errorMessage = (error as Error).getErrorMessage();
         setErrorMessage(errorMessage);
      }
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
                        {errorMessage && (
                           <Alert bsStyle="danger">
                              <p style={{textAlign: 'center'}}>{errorMessage} - Please try again</p>
                           </Alert>
                        )}
                        <form onSubmit={onSubmit}>
                           <FormGroup controlId="formSearch">
                              <ControlLabel className={classes.searchText}>Search</ControlLabel>
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
                              Submit
                           </Button>
                        </form>
                     </Col>
                  </Row>

                  <Row className={classes.groupInfo}>
                     <Row className={classes.spinner}>
                        {' '}
                        {loading && !errorMessage && <CircularProgress />}{' '}
                     </Row>
                     {searchData.length > 0 && !errorMessage && !loading && (
                        <InfoPage
                           data={searchData}
                           title="Group Info"
                           columns={columns}
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

export default TeamSearchView;
