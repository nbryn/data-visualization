import React, { Component } from "react";
import { Grid, Row } from "react-bootstrap";
import { FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";

import { connect } from "react-redux";
import { fetchGroupData } from "../../redux/actions/ngo/SearchAction";

import InfoPage from "../../components/common/InfoPage";
import Sidebar from "../../components/navigation/Sidebar";
import Header from "../../components/navigation/Header";

class SearchView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: "",
      renderGroupData: false,
      groupData: [],
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async onSubmit(e) {
    e.preventDefault();
    const { searchString } = this.state;

    await this.props.fetchGroupData(`"${searchString}"`);

    const { group } = this.props.groupData;

    const groupData = Object.keys(group).map((data) => {
      if (data === "owner") {
        return group[data].firstName + " " + group.owner.lastName;
      } else if (data === "admin") {
        return group[data].firstName + " " + group.admin.lastName;
      } else if (data === "members") {
        return group[data].map((member) => {
          return {
            name: member.firstName + " " + member.lastName,
          };
        });
      } else {
        return group[data];
      }
    });

    this.setState({
      renderGroupData: true,
      groupData,
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    const { groupData, renderGroupData, searchString } = this.state;

    const column1 = ["Registration Date", "Currency", "Cycle", "Type", "NGO"];

    const column2 = [
      "Last Meeting",
      "Box Balance",
      "Amount Per Share",
      "Loan Service Fee",
      "Loan Limit",
    ];

    const column3 = [
      "Total Meetings",
      "Total Loans",
      "Total Shares",
      "Owner",
      "Admin",
    ];

    const columns = [
      {
        dataField: "name",
        text: "Members",
      },
    ];
    return (
      <div>
        <div className="wrapper">
          <Sidebar />

          <div id="main-panel" className="main-panel" ref="mainPanel">
            <Header title="Group Search" />
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
                          value={searchString}
                          onChange={this.onChange}
                        />
                      </FormGroup>
                      <Button variant="primary" type="submit">
                        Go!
                      </Button>
                    </form>
                  </div>
                  {renderGroupData && (
                    <InfoPage
                      groupData={groupData}
                      columns={columns}
                      column1={column1}
                      column2={column2}
                      column3={column3}
                    />
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

const mapStateToProps = (state) => {
  return {
    groupData: state.NGO.groupData,
  };
};

export default connect(mapStateToProps, { fetchGroupData })(SearchView);
