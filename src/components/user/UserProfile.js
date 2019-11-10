import React, { Component } from "react";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";

import Sidebar from "../navigation/Sidebar.js";
import Header from "../navigation/Header.js";

class ProfileLayout extends Component {
  
  render() {
    return (
      <div className="wrapper">
        <Sidebar />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header title="Profile" />
          <div className="content">
            <Grid fluid>
              <Row>
                <Col md={8}>
                  <div className="card">
                    <div className="header">
                      <h4 className="title">Info</h4>
                    </div>
                    <div>
                      <form>
                        <Row>
                          <div className="col-md-6">
                            <FormGroup>
                              <ControlLabel>Email</ControlLabel>
                              <FormControl
                                type="text"
                                bsClass="form-control"
                                placeholder="Email"
                                
                              />
                            </FormGroup>
                          </div>
                        </Row>

                        <Row>
                          <div className="col-md-3">
                            <FormGroup>
                              <ControlLabel>FIRST NAME</ControlLabel>
                              <FormControl
                                type="text"
                                bsClass="form-control"
                                placeholder="First Name"
                                
                              />
                            </FormGroup>
                          </div>
                          <div className="col-md-3">
                            <FormGroup>
                              <ControlLabel>LAST NAME</ControlLabel>
                              <FormControl
                                type="text"
                                bsClass="form-control"
                                placeholder="Last Name"
                                
                              />
                            </FormGroup>
                          </div>
                        </Row>
                        <Row>
                          <div className="col-md-6">
                            <FormGroup>
                              <ControlLabel>PHONE NUMBER</ControlLabel>
                              <FormControl
                                type="text"
                                bsClass="form-control"
                                placeholder="Phonenumber"
                                
                              />
                            </FormGroup>
                          </div>
                        </Row>

                        <Button bsStyle="info" type="submit">
                          Update Profile
                        </Button>
                        <div className="clearfix" />
                      </form>
                    </div>
                  </div>
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileLayout;
