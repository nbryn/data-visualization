import React, {ReactElement, useEffect, useState} from 'react';

import Header from '../../components/navigation/Header.js';
import Sidebar from '../../components/navigation/Sidebar';
import {useUserContext} from '../../store/UserContext';

const {Grid, Row, ControlLabel, ListGroup, ListGroupItem} = require('react-bootstrap');

const UserProfile: React.FC = (): ReactElement => {
   const user = useUserContext().user;

   const properties = ['Email', 'Name', 'Phone Number', 'Gender'];
   const data: string[] = [];

   for (let key in user) {
      data.push(user[key]);
   }

   return (
      <div className="wrapper">
         <Sidebar />
         <div id="main-panel" className="main-panel">
            <Header title="Profile" />
            <div className="content">
               <div className="card">
                  <div className="header">
                     <h3 className="title">User Info</h3>
                  </div>

                  <Grid fluid>
                     {properties.map((element, index) => (
                        <Row>
                           <div className="col-md-6">
                              <ListGroup>
                                 <ControlLabel>{element}</ControlLabel>
                                 <ListGroupItem>{data[index++].toString().toUpperCase()}</ListGroupItem>
                              </ListGroup>
                           </div>
                        </Row>
                     ))}
                  </Grid>
               </div>
            </div>
         </div>
      </div>
   );
};

export default UserProfile;
