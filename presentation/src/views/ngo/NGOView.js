import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";

import { Grid, Row } from "react-bootstrap";
import { connect } from "react-redux";

import {
  infoPageColumn1,
  infoPageColumn2,
  infoPageColumn3,
} from "../../util/InfoPageGroupColumns";

import InfoPage from "../../components/common/InfoPage";
import Sidebar from "../../components/navigation/Sidebar";
import Header from "../../components/navigation/Header";

import { fetchGroupsByNGO } from "../../redux/actions/ngo/NGOGroupsActions";

class NGOView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderGroupData: false,
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
    await this.props.fetchGroupsByNGO('"FHIDO"');

    const { groupData } = this.props.groups;

    let id = 0;
    const newState = groupData.map((element) => {
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
    const { allGroups, groupData, renderGroupData } = this.state;

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
          renderGroupData: true,
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
                {renderGroupData && (
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
    groups: state.NGO.groups,
  };
};

export default connect(mapStateToProps, { fetchGroupsByNGO })(NGOView);
