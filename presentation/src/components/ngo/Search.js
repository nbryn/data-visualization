import React, { Component } from "react";

import { Grid, Row, Col } from "react-bootstrap";
import { FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { fetchGroupData } from "../../redux/actions/ngo/SearchAction";

import Sidebar from "../navigation/Sidebar";
import Header from "../navigation/Header";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: "",
      renderGroupData: false
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
      name: group.name,
      regDate: group.regDate,
      currency: group.currency,
      cycle: group.cycle,
      lastMeeting: group.lastMeeting,
      boxBalance: group.boxBalance,
      meetingsTotal: group.meetingsTotal,
      perShare: group.perShare,
      serviceFee: group.serviceFee,
      loanLimit: group.loanLimit,
      loans: group.loans,
      shares: group.shares,
      owner: group.owner.firstName + " " + group.owner.lastName,
      admin: group.admin.firstName + " " + group.admin.lastName,
      members: group.members
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
              title="Group Search
          "
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
                        Search
                      </Button>
                    </form>
                  </div>
                  {this.state.renderGroupData ? <div>Hej</div> : ""}
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
