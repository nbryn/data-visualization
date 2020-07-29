import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Grid, Row } from 'react-bootstrap';
import { ControlLabel, ListGroup, ListGroupItem } from 'react-bootstrap';

import Sidebar from '../../components/navigation/Sidebar.js';
import Header from '../../components/navigation/Header.js';

class UserProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      name: '',
      phoneNumber: '',
      gender: '',
      verified: ''
    };
  }
  async componentDidMount() {
    const { currentUser } = this.props;

    this.setState({
      email: currentUser.email,
      name: currentUser.firstName + ' ' + currentUser.lastName,
      phoneNumber: currentUser.phoneNumber,
      gender: currentUser.gender,
      verified: currentUser.verified
    });
  }
  render() {
    const properties = ['Email', 'Name', 'Phone Number', 'Gender'];
    let data = [];

    for (let key in this.state) {
      data.push(this.state[key]);
    }
    return (
      <div className="wrapper">
        <Sidebar />
        <div id="main-panel" className="main-panel" ref="mainPanel">
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
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.general.currentUser
  };
};

export default connect(mapStateToProps)(UserProfile);
