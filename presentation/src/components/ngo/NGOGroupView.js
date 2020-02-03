import React, { Component } from "react";

import BootstrapTable from "react-bootstrap-table-next";

import paginationFactory from "react-bootstrap-table2-paginator";

import { Grid, Row, Col } from "react-bootstrap";
import { FormGroup, ControlLabel, FormControl } from "react-bootstrap";

import Sidebar from "../navigation/Sidebar";
import Header from "../navigation/Header";

class NGOGroupView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const groupInfo = this.props.location.state.groupInfo;

    let groupData = [];

    for (let key in groupInfo) {
      if (key != "id") {
        let ele = groupInfo[key];
        groupData.push(ele);
      }
    }

    const properties = [
      "Group Name",
      "Registration Date",
      "Currency",
      "Cycle",
      "Last Meeting",
      "Box Balance",
      "Total Meetings",
      "Amount Per Share",
      "Loan Service Fee",
      "Loan Limit",
      "Total Loans",
      "Total Shares",
      "Owner",
      "Admin"
    ];

    const generateFields = (name, value) => {
      return (
        <Row>
          <div className="group-view-row">
            <FormGroup>
              <ControlLabel>{name}</ControlLabel>
              <FormControl type="text" placeholder={name} value={value} />
            </FormGroup>
          </div>
        </Row>
      );
    };

    const renderGroupData = index => {
      let row = 0;
      let arr = [];
      while (row < 7 && index < properties.length) {
        row++;
        arr.push(generateFields(properties[index], groupData[index++]));
      }

      return arr.map(element => element);
    };

    const columns = [
      {
        dataField: "name",
        text: "Members"
      }
    ];
    return (
      <div className="wrapper">
        <Sidebar />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header title="Group Overview" />
          <div className="content">
            <Grid fluid>
              <Row>
                <div className="group-view-col">
                  <Col lg={3}>{renderGroupData(0)}</Col>

                  <Col lg={3}>{renderGroupData(7)}</Col>
                </div>
                <Col lg={3}>
                  <BootstrapTable
                    keyField="id"
                    data={groupInfo.members}
                    columns={columns}
                    pagination={paginationFactory()}
                  />
                </Col>
              </Row>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}

export default NGOGroupView;
