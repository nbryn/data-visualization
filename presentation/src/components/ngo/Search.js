import React, { Component } from "react";
import { Grid, Row } from "react-bootstrap";
import { FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";

import { connect } from "react-redux";
import { fetchGroupData } from "../../redux/actions/ngo/SearchAction";

import NGOGroupView from "./NGOGroupView";
import Sidebar from "../navigation/Sidebar";
import Header from "../navigation/Header";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: "",
      renderGroupData: false,
      groupData: []
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async onSubmit(e) {
    e.preventDefault();
    const { searchString } = this.state;

    await this.props.fetchGroupData(`"${searchString}"`);

    const group = this.props.groupData.group;

    this.setState({
      renderGroupData: true,
      groupData: [
        group.name,
        group.regDate,
        group.currency,
        group.cycle,
        group.type,
        group.ngo,
        group.lastMeeting,
        group.boxBalance,
        group.meetingsTotal,
        group.perShare,
        group.serviceFee,
        group.loanLimit,
        group.loans,
        group.shares,
        group.owner.firstName + " " + group.owner.lastName,
        group.admin.firstName + " " + group.admin.lastName,
        group.members.map(member => {
          return {
            name: member.firstName + " " + member.lastName
          };
        })
      ]
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <Sidebar />

          <div id="main-panel" className="main-panel" ref="mainPanel">
            <Header
              title="Group Search"
          
            />
            <div className="content">
              <Grid fluid>
                <Row>
                  <div className="search-field">
                    <form onSubmit={this.onSubmit}>
                      <FormGroup controlId="formSearch">
                        <ControlLabel>Search</ControlLabel>
                        <FormControl
                          type="text"
                          placeholder="Group Name"
                          name="searchString"
                          value={this.state.searchString}
                          onChange={this.onChange}
                        />
                      </FormGroup>
                      <Button variant="primary" type="submit">
                        Go!
                      </Button>
                    </form>
                  </div>
                  {this.state.renderGroupData ? (
                    <NGOGroupView
                      groupData={this.state.groupData}
                    ></NGOGroupView>
                  ) : (
                    ""
                  )}
                </Row>
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
    groupData: state.NGO.groupData
  };
};

export default connect(mapStateToProps, { fetchGroupData })(Search);
