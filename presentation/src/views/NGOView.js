import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";

import { Grid, Row } from "react-bootstrap";
import { connect } from "react-redux";

import NGOGroupView from "../components/ngo/Group";
import Sidebar from "../components/navigation/Sidebar";
import Header from "../components/navigation/Header";

import { fetchGroupsByNGO } from "../redux/actions/ngo/NGOGroupsActions";

class NGOView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      renderGroupData: false,
      allGroups: [],
      groupdata: ""
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

    const newState = this.props.groups.groupData.map(element => {
      return {
        id: element.id,
        regDate: element.regDate,
        name: element.name,
        currency: element.currency,
        cycle: element.cycle,
        type: element.type,
        ngo: element.ngo,
        boxBalance: element.boxBalance,
        lastMeeting: element.lastMeeting,
        meetingsTotal: element.meetingsTotal,
        perShare: element.perShare,
        serviceFee: element.serviceFee,
        loanLimit: element.loanLimit,
        shares: element.shares,
        loans: element.loans,
        admin: element.admin.firstName + " " + element.admin.lastName,
        owner: element.owner.firstName + " " + element.owner.lastName,
        members: element.members.map(member => {
          return {
            name: member.firstName + " " + member.lastName
          };
        })
      };
    });

    this.setState({
      allGroups: newState
    });
  }
  render() {
    let groupData;
    let id = 0;

    if (Array.isArray(this.state.allGroups)) {
      groupData = this.state.allGroups.map(group => {
        return {
          id: id++,
          name: group.name,
          regDate: group.regDate,
          currency: group.currency,
          cycle: group.cycle,
          group: group.type,
          ngo: group.ngo,
          lastMeeting: group.lastMeeting,
          boxBalance: group.boxBalance,
          meetingsTotal: group.meetingsTotal,
          perShare: group.perShare,
          serviceFee: group.serviceFee,
          loanLimit: group.loanLimit,
          shares: group.shares,
          loans: group.loans,
          admin: group.admin,
          owner: group.owner,
          members: group.members
        };
      });
    }

    const { SearchBar } = Search;

    const selectRow = {
      mode: "radio",
      clickToSelect: true,
      style: { backgroundColor: "#c8e6c9" },
      onSelect: (row, isSelect, rowIndex, e) => {
        let data = [];
        for (let key in row) {
          if (key !== "id") {
            data.push(row[key]);
          }
        }

        this.setState({
          renderGroupData: true,
          groupData: data
        });
      }
    };

    const columns = [
      {
        dataField: "name",
        text: "Name"
      },

      {
        dataField: "admin",
        text: "Admin"
      },
      {
        dataField: "owner",
        text: "Owner"
      }
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
                      data={groupData}
                      columns={columns}
                      striped
                      hover
                      condensed
                      search
                    >
                      {props => (
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
                            data={groupData ? groupData : []}
                            columns={columns}
                            selectRow={selectRow}
                            pagination={paginationFactory()}
                          />
                        </div>
                      )}
                    </ToolkitProvider>
                  </div>
                </Row>
                {this.state.renderGroupData ? (
                  <NGOGroupView groupData={this.state.groupData} />
                ) : (
                  ""
                )}
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
    groups: state.NGO.groups
  };
};

export default connect(mapStateToProps, { fetchGroupsByNGO })(NGOView);
