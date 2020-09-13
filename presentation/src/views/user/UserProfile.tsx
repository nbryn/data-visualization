import React, {ReactElement} from 'react';
import {makeStyles} from '@material-ui/core/styles';

import Header from '../../components/navigation/Header.js';
import Sidebar from '../../components/navigation/Sidebar';
import {useUserContext} from '../../store/UserContext';

const {Grid, Row, Col, ControlLabel, ListGroup, ListGroupItem} = require('react-bootstrap');

const useStyles = makeStyles((theme) => ({
   title: {
      marginTop: 5,
      marginBottom: 40,
      marginLeft: -20,
   },
   userInfo: {
      marginLeft: -20,
   },
}));

const UserProfile: React.FC = (): ReactElement => {
   const classes = useStyles();
   const user = useUserContext().user;

   const properties = ['Name', 'Email', 'Phone Number', 'Gender'];
   const data: string[] = [];

   for (const key in user) {
      data.push(user[key]);
   }

   return (
      <div className="wrapper">
         <Sidebar />
         <div id="main-panel" className="main-panel">
            <Header title="Profile" />
            <div className="content">
               <Grid fluid>
                  <h3 className={classes.title}>
                     <b>User Info</b>
                  </h3>

                  {properties.map((element, index) => (
                     <Row key={index}>
                        <Col sm={4} lg={2}>
                           <ListGroup className={classes.userInfo}>
                              <ControlLabel>{element}</ControlLabel>
                              <ListGroupItem>{user && data[index++].toString().toUpperCase()}</ListGroupItem>
                           </ListGroup>
                        </Col>
                     </Row>
                  ))}
               </Grid>
            </div>
         </div>
      </div>
   );
};

export default UserProfile;
