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
                        <div className="col-md-5">
                          <FormGroup>
                            <ControlLabel>Company</ControlLabel>
                            <FormControl
                              type="text"
                              bsClass="form-control"
                              placeholder="Company"
                              defaultValue="jamiipay"
                            />
                          </FormGroup>
                        </div>
                        <div className="col-md-3">
                          <FormGroup>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                              type="text"
                              bsClass="form-control"
                              placeholder="Email"
                              defaultValue="nib@jamii-pay.com"
                              
                            />
                          </FormGroup>
                        </div>
                        </Row>
                        
                        <Row>
                        <div className="col-md-5">
                          <FormGroup>
                            <ControlLabel>FIRST NAME</ControlLabel>
                            <FormControl
                              type="text"
                              bsClass="form-control"
                              placeholder="First Name"
                              defaultValue="Niklas"
                              
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
                              defaultValue="Brynfeldt"
                              
                            />
                          </FormGroup>
                        </div>
                        </Row>
                        <Row>
                        <div className="col-md-8">
                          <FormGroup>
                            <ControlLabel>ADRESS</ControlLabel>
                            <FormControl
                              type="text"
                              bsClass="form-control"
                              placeholder="Adress"
                              defaultValue="Lundebjergårdsvej 114, 2. TV"
                              
                            />
                          </FormGroup>
                          </div>
                          </Row>
                          <Row>
                        <div className="col-md-5">
                          <FormGroup>
                            <ControlLabel>CITY</ControlLabel>
                            <FormControl
                              type="text"
                              bsClass="form-control"
                              placeholder="CITY"
                              defaultValue="Skovlunde"
                              
                            />
                          </FormGroup>
                        </div>
                        <div className="col-md-3">
                          <FormGroup>
                            <ControlLabel>ZIP</ControlLabel>
                            <FormControl
                              type="text"
                              bsClass="form-control"
                              placeholder=">IP"
                              defaultValue="2740"
                              
                            />
                          </FormGroup>
                        </div>
                        </Row>

                        <Button bsStyle="info" pullRight fill type="submit">
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
