import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search, ColumnToggle } from "react-bootstrap-table2-toolkit";
import paginationFactory from 'react-bootstrap-table2-paginator';

import { Grid, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import Sidebar from "../navigation/Sidebar";
import Header from "../navigation/Header";

import { fetchGroupsByNGO } from "../../redux/actions/ngo/NGOGroupsAction";

class NGOView extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
        name: element.name,
        cycle: element.cycle,
        meetings: element.meetings,
        shares: element.shares,
        loans: element.loans,
        admin: element.admin,
        owner: element.owner
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
        console.log(this.state.data);
        return {
          id: id++,
          name: group.name,
          cycle: group.cycle,
          meetings: group.meetings,
          shares: group.shares,
          loans: group.loans,
          admin: group.admin,
          owner: group.owner
        };
      });
    }

    const { SearchBar, ClearSearchButton } = Search;

    const selectRow = {
      mode: "radio",
      clickToSelect: true,
      style: { backgroundColor: "#c8e6c9" }
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
        dataField: "meetings",
        text: "Meetings"
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

    return (
      <div className="wrapper">
        <Sidebar />

        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header
            title="NGOView
          "
          />
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
                placeholder="Group Name"/>
                <ClearSearchButton {...props.searchProps} />
                
                <hr />
                <ToggleList { ...props.columnToggleProps } />
                <div className="content">
                  <Grid fluid>
                    <Row>
                      <BootstrapTable
                        {...props.baseProps}
                        keyField="id"
                        data={groupData ? groupData : []}
                        columns={columns}
                        selectRow={selectRow}
                        pagination={ paginationFactory()}
                        
                      />
                    </Row>
                  </Grid>
                </div>
              </div>
            )}
          </ToolkitProvider>
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
connect(mapStateToProps);

export default connect(mapStateToProps, { fetchGroupsByNGO })(NGOView);
