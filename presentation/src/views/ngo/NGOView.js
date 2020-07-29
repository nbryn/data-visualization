import BootstrapTable from "react-bootstrap-table-next";
import CircularProgress from "@material-ui/core/CircularProgress";
import { connect } from "react-redux";
import { Grid, Row } from "react-bootstrap";
import React, { Component } from "react";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";

import * as GroupThunks from '../../thunks/GroupThunks';

import {
  infoPageColumn1,
  infoPageColumn2,
  infoPageColumn3,
} from "../../util/InfoPageGroupColumns";
import Header from "../../components/navigation/Header";
import InfoPage from "../../components/common/InfoPage";
import Sidebar from "../../components/navigation/Sidebar";

class NGOView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allGroups: [],
    };
  }

  componentDidMount() {
    this.fetchData();

    setInterval(async () => {
      this.fetchData();
    }, 10000000);
  }

  async fetchData() {
    await this.props.fetchNGOData('"FHIDO"');

    console.log(this.props);

    const { groups } = this.props;

    let id = 0;
    const newState = groups.map((element) => {
      return {
        id: id++,
        ...element,
        admin: element.admin.firstName + " " + element.admin.lastName,
        owner: element.owner.firstName + " " + element.owner.lastName,
        members: element.members.map((member) => {
          return {
            name: member.firstName + " " + member.lastName,
          };
        }),
      };
    });

    this.setState({
      allGroups: newState,
    });
  }
  render() {
    const { SearchBar } = Search;
    const { allGroups, groupData } = this.state;

    const selectRow = {
      mode: "radio",
      clickToSelect: true,
      style: { backgroundColor: "#c8e6c9" },
      onSelect: (row, isSelect, rowIndex, e) => {
        const data = [];
        for (let key in row) {
          if (key !== "id") data.push(row[key]);
        }

        this.setState({
          groupData: data,
        });
      },
    };

    const columnsInfoPageMembers = [
      {
        dataField: "name",
        text: "Members",
      },
    ];

    const columns = [
      {
        dataField: "name",
        text: "Name",
      },

      {
        dataField: "admin",
        text: "Admin",
      },
      {
        dataField: "owner",
        text: "Owner",
      },
    ];

    return (
      <div className="wrapper">
        <Sidebar />

        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header
            title="NGOView
          "
          />
          <div className="content">
            <div className="all-groups">
              <Grid fluid>
                <Row>
                  <div className="col-md-5">
                    <ToolkitProvider
                      keyField="name"
                      data={allGroups}
                      columns={columns}
                      striped
                      hover
                      condensed
                      search
                    >
                      {(props) => (
                        <div>
                          <h4>
                            <b>Groups</b>
                          </h4>
                          <SearchBar
                            {...props.searchProps}
                            placeholder="Search"
                          />
                          <BootstrapTable
                            {...props.baseProps}
                            keyField="id"
                            data={allGroups}
                            columns={columns}
                            selectRow={selectRow}
                            pagination={paginationFactory()}
                          />
                        </div>
                      )}
                    </ToolkitProvider>
                  </div>
                </Row>
                {allGroups.length === 0 && <CircularProgress />}
                {groupData && (
                  <InfoPage
                    groupData={groupData}
                    columns={columnsInfoPageMembers}
                    column1={infoPageColumn1}
                    column2={infoPageColumn2}
                    column3={infoPageColumn3}
                  />
                )}
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
    groups: state.groups.ngoGroupData,
  };
};

const mapDispatchToProps = (dispatch) => ({
  fetchNGOData: (ngo) => dispatch(GroupThunks.setNGOGroupsData(ngo))
});

export default connect(mapStateToProps, mapDispatchToProps)(NGOView);
