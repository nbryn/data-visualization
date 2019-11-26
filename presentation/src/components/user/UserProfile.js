import React, { Component } from "react";

import { connect } from "react-redux";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";

import Sidebar from "../navigation/Sidebar.js";
import Header from "../navigation/Header.js";

import { setCurrentUser } from "../../redux/actions/User/SetUserAction";

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      gender: "",
      verified: ""
    };
  }
  async componentDidMount() {
    const temp = await this.props.setCurrentUser();

    const user = this.props.user.currentUser;

    this.setState({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      verified: user.verified
    });
  }
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
                                placeholder="Email"
                                value={this.state.email}
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
                                placeholder="First Name"
                                value={this.state.firstName}
                              />
                            </FormGroup>
                          </div>
                          <div className="col-md-3">
                            <FormGroup>
                              <ControlLabel>LAST NAME</ControlLabel>
                              <FormControl
                                type="text"
                                placeholder="Last Name"
                                value={this.state.lastName}
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
                                placeholder="Phonenumber"
                                value={this.state.phoneNumber}
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
                                placeholder="Phonenumber"
                                value={this.state.gender}
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
                                placeholder="Phonenumber"
                                value={this.state.verified}
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

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps, { setCurrentUser })(UserProfile);
