import BootstrapTable, {SelectRowProps} from 'react-bootstrap-table-next';
import CircularProgress from '@material-ui/core/CircularProgress';
import {ColumnDescription} from 'react-bootstrap-table-next';
import {makeStyles} from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import React, {ReactElement, useEffect, useState} from 'react';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {Search} from 'react-bootstrap-table2-toolkit';

import * as TeamThunks from '../../thunks/TeamThunks';
import {TeamData} from '../../store/datamodels/Team';
import {TeamDataProp} from '../../store/datamodels/Team';
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
   searchBar: {
      marginLeft: 14,
   },
   spinner: {
      textAlign: 'center',
      marginTop: 50,
   },
}));

const OrgView: React.FC = (): ReactElement => {
   const classes = useStyles();

   const [selectedTeamData, setSelectedGroupData] = useState<TeamDataProp>([]);

   const data: TeamData[] = useSelector<RootState, TeamData[]>((state) => state.teams.orgTeamData);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(TeamThunks.updateOrgTeamData('"Tv-Stars"'));
   }, []);

   const {SearchBar} = Search;

   const selectRow: SelectRowProps<TeamData> = {
      mode: 'radio',
      clickToSelect: true,
      style: {backgroundColor: '#c8e6c9'},
      onSelect: (row: TeamData) => {
         const data: TeamDataProp = [];
         for (const key in row) {
            if (key !== 'id' && key !== 'name') data.push(row[key]);
         }
         setSelectedGroupData(data);
      },
   };

   const columnsInfoPageMembers: ColumnDescription[] = [
      {
         dataField: 'name',
         text: 'Players',
      },
   ];

   const columns: ColumnDescription[] = [
      {
         dataField: 'name',
         text: 'Team',
      },

      {
         dataField: 'admin',
         text: 'Coach',
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
            <Header title="Organization View" />
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
                                 <Row>
                                    <Col lg={10} md={8} sm={6}>
                                       <h4>
                                          <b>ORG Search</b>
                                       </h4>
                                    </Col>
                                 </Row>
                                 <Row>
                                    <Row className={classes.searchBar}>
                                       <SearchBar {...props.searchProps} placeholder="ORG: Tv-Stars" />
                                    </Row>
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
                  <Row className={classes.spinner}>{data.length === 0 && <CircularProgress />}</Row>
                  <Row>
                     {selectedTeamData.length > 0 && (
                        <InfoPage
                           data={selectedTeamData}
                           title="Team Info"
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

export default OrgView;
