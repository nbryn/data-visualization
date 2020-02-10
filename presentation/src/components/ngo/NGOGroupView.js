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

    let groupDataIndex = 0;

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
      
      <Grid fluid>
     
        <hr className="ngo-line"/>
          <div className="group-view-col">
          
            <Col lg={3}>
           
            <Panel>
              {column1.map((prop, index) => (
                <Row >
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
              </Panel>
              
            </Col>
           

            <Col lg={3}>
           
            <Panel>
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
              </Panel>
            </Col>
            
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
         
      </Grid>
    );
  }
}

export default NGOGroupView;
