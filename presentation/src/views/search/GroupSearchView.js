import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button, ControlLabel, FormGroup, FormControl } from "react-bootstrap";
import { Grid, Row } from "react-bootstrap";
import React, { Component } from "react";

import {
  infoPageColumn1,
  infoPageColumn2,
  infoPageColumn3,
} from "../../util/InfoPageGroupColumns";
import { fetchGroupData } from "../../redux/actions/ngo/SearchAction";
import Header from "../../components/navigation/Header";
import InfoPage from "../../components/common/InfoPage";
import Sidebar from "../../components/navigation/Sidebar";

class SearchView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      searchString: "",
      groupData: [],
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  async onSubmit(e) {
    e.preventDefault();
    const { searchString } = this.state;

    this.setState({
      loading: true,
    });

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
      loading: false,
      groupData,
    });
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  render() {
    const { groupData, searchString, loading } = this.state;

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
                  {loading && <CircularProgress className="spinner" />}
                  {groupData.length !== 0 && (
                    <InfoPage
                      groupData={groupData}
                      columns={columns}
                      column1={infoPageColumn1}
                      column2={infoPageColumn2}
                      column3={infoPageColumn3}
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
