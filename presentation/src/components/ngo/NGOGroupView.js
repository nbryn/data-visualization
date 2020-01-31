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
    const groupInfo = this.props.groupInfo;

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
                <Col lg={3}>
                  <div>{renderGroupInfo("Group Name", groupInfo.name)}</div>
                  <div>
                    {renderGroupInfo("Registration Date", groupInfo.regDate)}
                  </div>
                  <div>{renderGroupInfo("Currency", groupInfo.currency)}</div>
                  <div>{renderGroupInfo("Cycle", groupInfo.cycle)}</div>
                  <div>{renderGroupInfo("Last Meeting")}</div>
                  <div>
                    {renderGroupInfo("Loan Service Fee", groupInfo.serviceFee)}
                  </div>
                  <div>
                    {renderGroupInfo("Loan Limit", groupInfo.loanLimit)}
                  </div>
                  <div>
                    {renderGroupInfo("Amount Per Share", groupInfo.perShare)}
                  </div>
                </Col>
                <Col lg={3}>
                  <div>
                    {renderGroupInfo("Total Meetings", groupInfo.meetingsTotal)}
                  </div>
                  <div>{renderGroupInfo("Meetings In Cycle")}</div>
                  <div>{renderGroupInfo("Total Loans", groupInfo.loans)}</div>
                  <div>{renderGroupInfo("Loans In Cycle")}</div>
                  <div>{renderGroupInfo("Total Shares", groupInfo.shares)}</div>
                  <div>{renderGroupInfo("Shares In Cycle")}</div>
                  <div>{renderGroupInfo("Owner", groupInfo.owner)}</div>
                  <div>{renderGroupInfo("Admin", groupInfo.admin)}</div>
                </Col>

                <Col lg={3}>
                  <BootstrapTable
                    keyField="id"
                    data={this.props.groupInfo.members}
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
