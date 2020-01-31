import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, {
  Search,
  ColumnToggle
} from "react-bootstrap-table2-toolkit";
import paginationFactory from "react-bootstrap-table2-paginator";

import NGOGroupView from "./NGOGroupView";
import { Grid, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";

import Sidebar from "../navigation/Sidebar";
import Header from "../navigation/Header";

import { fetchGroupsByNGO } from "../../redux/actions/ngo/NGOGroupsActions";

class NGOView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newPage: false,
      groupInfo: "",
      data: {}
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
        meetingsTotal: element.meetingsTotal,
        perShare: element.perShare,
        serviceFee: element.serviceFee,
        loanLimit: element.loanLimit,
        shares: element.shares,
        loans: element.loans,
        admin: element.admin,
        owner: element.owner,
        members: element.members
      };
    });

    this.setState({
      data: newState
    });
  }
  render() {
    let groupData;
    let id = 0;

    if (Array.isArray(this.state.data)) {
      groupData = this.state.data.map(group => {
        return {
          id: id++,
          objectID: group.id,
          regDate: group.regDate,
          name: group.name,
          currency: group.currency,
          cycle: group.cycle,
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

    const { SearchBar, ClearSearchButton } = Search;

    const selectRow = {
      mode: "radio",
      clickToSelect: true,
      style: { backgroundColor: "#c8e6c9" },
      onSelect: (row, isSelect, rowIndex, e) => {
        this.setState({
          newPage: true,
          groupInfo: row
        });
      }
    };

    const { ToggleList } = ColumnToggle;

    const columns = [
      {
        dataField: "name",
        text: "Name"
      },
      {
        dataField: "cycle",
        text: "Cycle"
      },
      {
        dataField: "meetingsTotal",
        text: "Total Meetings"
      },
      {
        dataField: "shares",
        text: "Shares"
      },
      {
        dataField: "loans",
        text: "Loans"
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

    return this.state.newPage ? (
      <NGOGroupView groupInfo={this.state.groupInfo} />
    ) : (
      <div className="wrapper">
        <Sidebar />

        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header
            title="NGOView
          "
          />
          <div className="content">
            <Grid fluid>
              <ToolkitProvider
                keyField="name"
                data={groupData}
                columns={columns}
                search
                columnToggle
              >
                {props => (
                  <div>
                    <h4>Search</h4>
                    <SearchBar
                      {...props.searchProps}
                      placeholder="Group Name"
                    />
                    <ClearSearchButton {...props.searchProps} />

                    <hr />

                    <ToggleList {...props.columnToggleProps} />

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
            </Grid>
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
