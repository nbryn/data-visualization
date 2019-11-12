import React, { Component } from "react";

import { connect } from "react-redux";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";

import Sidebar from "../navigation/Sidebar.js";
import Header from "../navigation/Header.js";

class UserProfile extends Component {
  componentDidMount() {
    console.log(this.props.user.user);
  }
  render() {
    const user = this.props.user.user;
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
                                value={user.email}
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
                                value={user.firstName}
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
                                value={user.lastName}
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
                                value={user.phoneNumber}
                              />
                            </FormGroup>
                          </div>
                        </Row>
                        <Row>
                          <div className="col-md-6">
                            <FormGroup>
                              <ControlLabel>GENDER</ControlLabel>
                              <FormControl
                                type="text"
                                bsClass="form-control"
                                placeholder="Phonenumber"
                                value={user.gender}
                              />
                            </FormGroup>
                          </div>
                        </Row>
                        <Row>
                          <div className="col-md-6">
                            <FormGroup>
                              <ControlLabel>Verified</ControlLabel>
                              <FormControl
                                type="text"
                                bsClass="form-control"
                                placeholder="Phonenumber"
                                value={user.verified}
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

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(UserProfile);
