import React, { Component } from "react";

import { connect } from "react-redux";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { ControlLabel, ListGroup, ListGroupItem } from "react-bootstrap";

import Sidebar from "../navigation/Sidebar.js";
import Header from "../navigation/Header.js";

import { setCurrentUser } from "../../redux/actions/user/SetUserAction";

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

    const user = this.props.user.currentUser.me;

    this.setState({
      email: user.email,
      name: user.firstName + " " + user.lastName,
      phoneNumber: user.phoneNumber,
      gender: user.gender,
      verified: user.verified
    });
  }
  render() {
    const properties = ["Email", "Name", "Phone Number", "Gender", "Verified"];
    console.log(this.state);
    return (
      
      <div className="wrapper">
        <Sidebar />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header title="Profile" />
          <div className="content">
            <div className="card">
              <div className="header">
                <h4 className="title">Info</h4>
              </div>

              <Grid fluid>
                {properties.map((element, index) => (
                  <Row>
                    <div className="col-md-6">
                      <ListGroup>
                        <ControlLabel>{element}</ControlLabel>
                        <ListGroupItem>{this.state.element}</ListGroupItem>
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
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.currentUser
  };
};

export default connect(mapStateToProps, { setCurrentUser })(UserProfile);
