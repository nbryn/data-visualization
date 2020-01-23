import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";

import Sidebar from "../navigation/Sidebar";
import Header from "../navigation/Header";

import { connect } from "react-redux";

import { Grid, Row, Col } from "react-bootstrap";

class NGOGroupView extends Component {
  render() {
    const products = [
      {
        id: 1,
        name: "1"
      },
      {
        id: 2,
        name: "2"
      },
      {
        id: 3,
        name: "3"
      }
    ];
    const columns = [
      {
        dataField: "id",
        text: "Group Name"
      },
      {
        dataField: "name",
        text: "Cycle"
      },
      {
        dataField: "meeting",
        text: "Meetings"
      },
      {
        dataField: "share",
        text: "Shares"
      },
      {
        dataField: "loan",
        text: "Loans"
      },
      {
        dataField: "agent",
        text: "Agent"
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
            <Grid fluid>
              <Row>
                <BootstrapTable
                  keyField="id"
                  data={products}
                  columns={columns}
                />
              </Row>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    groups: state.NGO.financeStats
  };
};

export default connect(mapStateToProps)(NGOGroupView);
