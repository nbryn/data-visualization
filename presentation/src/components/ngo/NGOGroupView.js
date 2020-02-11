import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import { Grid, Row, Col, Panel } from "react-bootstrap";
import { ControlLabel, ListGroup, ListGroupItem } from "react-bootstrap";

class NGOGroupView extends Component {
  constructor(props) {
    super(props);

    this.setState({
      showHeader: false
    });
  }

  render() {
    const groupData = this.props.groupData;

    console.log(groupData);

    let groupDataIndex = 0;

    const column1 = [
      "Group Name",
      "Registration Date",
      "Currency",
      "Cycle",
      "Last Meeting"
    ];

    const column2 = [
      "Box Balance",
      "Total Meetings",
      "Amount Per Share",
      "Loan Service Fee",
      "Loan Limit"
    ];

    const column3 = ["Total Loans", "Total Shares", "Owner", "Admin"];

    const columns = [
      {
        dataField: "name",
        text: "Members"
      }
    ];

    return (
      <div>
        <Row>
          <hr className="groupview-line" />
          <h3 className="groupview-header">
            <b>Group Info</b>
          </h3>
          <br />
          <div className="group-view-col">
            <div className="col-md-2">
              <Col lg={3}>
                <Panel>
                  {column1.map((prop, index) => (
                    <div key={index} className="group-view-row">
                      <ListGroup>
                        <ControlLabel>{prop}</ControlLabel>
                        <ListGroupItem>
                          {groupData[groupDataIndex++]}
                        </ListGroupItem>
                      </ListGroup>
                    </div>
                  ))}
                </Panel>
              </Col>
            </div>

            <div className="col-md-2">
              <Col lg={3}>
                <Panel>
                  {column2.map((prop, index) => (
                    <div key={index} className="group-view-row">
                      <ListGroup>
                        <ControlLabel>{prop}</ControlLabel>
                        <ListGroupItem>
                          {groupData[groupDataIndex++]}
                        </ListGroupItem>
                      </ListGroup>
                    </div>
                  ))}
                </Panel>
              </Col>
            </div>

            <div className="col-md-2">
              <Col lg={3}>
                <Panel>
                  {column3.map((prop, index) => (
                    <div key={index} className="group-view-row">
                      <ListGroup>
                        <ControlLabel>{prop}</ControlLabel>
                        <ListGroupItem>
                          {groupData[groupDataIndex++]}
                        </ListGroupItem>
                      </ListGroup>
                    </div>
                  ))}
                </Panel>
              </Col>
            </div>
          </div>

          <Col lg={3}>
            <Row>
              <BootstrapTable
                keyField="id"
                data={groupData[groupData.length - 1]}
                columns={columns}
                pagination={paginationFactory()}
              />
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default NGOGroupView;
