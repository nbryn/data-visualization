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
  componentDidMount() {
    console.log(this.props);
  }

  render() {
    const groupInfo = this.props.location.state.groupInfo;

    const renderGroupInfo = (name, prop) => {
      return (
        <Row>
          <div className="col-md-5">
            <FormGroup>
              <ControlLabel>{name}</ControlLabel>
              <FormControl type="text" placeholder={name} value={prop} />
            </FormGroup>
          </div>
        </Row>
      );
    };

    let groupData = [];

    for (let key in groupInfo) {
      const ele = {
        [key]: groupInfo[key]
      };

      groupData.push(ele);
    }

    console.log(groupData);

    const properties = [
      "Group Name",
      "Registration Date",
      "Currency",
      "Cycle",
      "Box Balance",
      "Last Meeting",
      "Loan Service Fee",
      "Loan Limit",
      "Amount Per Share",
      "Total Meetings",
      "Meetings In Cycle",
      "Total Loans",
      "Loans In Cycle",
      "Total Shares",
      "Shares In Cycle",
      "Owner",
      "Admin"
    ];

    const show = start => {
      let counter = 0;
      let arr = [];
      while (counter < 8) {
        counter++;
        console.log(properties[start]);
        console.log(groupData[start++]);
        arr.push(renderGroupInfo(properties[start], groupData[start++]));
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
                <Col lg={3}>{show(0)}</Col>
                <Col lg={3}>{show(8)}</Col>

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
