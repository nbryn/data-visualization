import React, { Component } from "react";

import BootstrapTable from "react-bootstrap-table-next";

import paginationFactory from "react-bootstrap-table2-paginator";

import { Grid, Row, Col } from "react-bootstrap";
import { ControlLabel, ListGroup, ListGroupItem } from "react-bootstrap";

import Sidebar from "../navigation/Sidebar";
import Header from "../navigation/Header";

class NGOGroupView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const groupInfo = this.props.location.state.groupInfo;

    let groupDataIndex = 0;
    let groupData = [];

    for (let key in groupInfo) {
      if (key != "id") {
        let ele = groupInfo[key];
        groupData.push(ele);
      }
    }

    const column1 = [
      "Group Name",
      "Registration Date",
      "Currency",
      "Cycle",
      "Last Meeting",
      "Box Balance",
      "Total Meetings"
    ];

    const column2 = [
      "Amount Per Share",
      "Loan Service Fee",
      "Loan Limit",
      "Total Loans",
      "Total Shares",
      "Owner",
      "Admin"
    ];

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
                  <Col lg={3}>
                    {column1.map((prop, index) => (
                      <Row>
                        <div key={index} className="group-view-row">
                          <ListGroup>
                            <ControlLabel>{prop}</ControlLabel>
                            <ListGroupItem>
                              {groupData[groupDataIndex++]}
                            </ListGroupItem>
                          </ListGroup>
                        </div>
                      </Row>
                    ))}
                  </Col>

                  <Col lg={3}>
                    {column2.map((prop, index) => (
                      <Row>
                        <div key={index} className="group-view-row">
                          <ListGroup>
                            <ControlLabel>{prop}</ControlLabel>
                            <ListGroupItem>
                              {groupData[groupDataIndex++]}
                            </ListGroupItem>
                          </ListGroup>
                        </div>
                      </Row>
                    ))}
                  </Col>
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
