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
        <Row >
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
                  {renderGroupInfo("Group Name", groupInfo.name)}
                  {renderGroupInfo("Registration Date", groupInfo.regDate)}
                  {renderGroupInfo("Currency", groupInfo.currency)}
                  {renderGroupInfo("Cycle", groupInfo.cycle)}
                  {renderGroupInfo("Last Meeting", groupInfo.lastMeeting)}
                  {renderGroupInfo("Loan Service Fee", groupInfo.serviceFee)}
                  {renderGroupInfo("Loan Limit", groupInfo.loanLimit)}
                  {renderGroupInfo("Amount Per Share", groupInfo.perShare)}
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
