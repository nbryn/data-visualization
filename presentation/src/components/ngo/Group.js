import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import { Row, Col, Panel } from "react-bootstrap";
import { ControlLabel, ListGroup, ListGroupItem } from "react-bootstrap";

class Group extends Component {
  constructor(props) {
    super(props);

    this.setState({
      showHeader: false,
    });
  }

  render() {
    const groupData = this.props.groupData;
    let groupDataIndex = 0;

    const column1 = ["Registration Date", "Currency", "Cycle", "Type", "NGO"];

    const column2 = [
      "Last Meeting",
      "Box Balance",
      "Amount Per Share",
      "Loan Service Fee",
      "Loan Limit",
    ];

    const column3 = [
      "Total Meetings",
      "Total Loans",
      "Total Shares",
      "Owner",
      "Admin",
    ];

    const columns = [
      {
        dataField: "name",
        text: "Members",
      },
    ];

    return (
      <div>
        <Row>
          <hr className="groupview-line" />
          <h3 className="groupview-header">
            <b>Group: {groupData[groupDataIndex++]}</b>
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

export default Group;
