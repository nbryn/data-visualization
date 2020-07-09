import React, { Component } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

import { Row, Col, Panel } from "react-bootstrap";
import { ControlLabel, ListGroup, ListGroupItem } from "react-bootstrap";

class InfoPage extends Component {
  constructor(props) {
    super(props);

    this.setState({
      showHeader: false,
    });
  }

  render() {
    const { groupData, columns, column1, column2, column3 } = this.props;
    let groupDataIndex = 0;

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
              <Col md={3} lg={3}>
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
              <Col md={3} lg={3}>
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
              <Col md={3} lg={3}>
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

          <Col md={3} lg={3}>
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

export default InfoPage;
