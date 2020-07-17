import { Col, Row } from "react-bootstrap";
import React, { Component } from "react";
import { connect } from "react-redux";

import {
  fetchUsersLastMonth,
  fetchUsersLastYear,
} from "../../redux/actions/kpi/UserActions";
import Header from "../../components/navigation/Header";
import Sidebar from "../../components/navigation/Sidebar";
import UsersTotalContainer from "../../containers/chartjs/UsersTotalContainer";

type Props = {
  usersLastMonth: Function;
  usersLastYear: Function;
};

class MainViews extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  componentDidMount() {
    this.fetchData();
  }

  async fetchData() {
    await this.props.usersLastMonth();
    await this.props.usersLastYear();
  }
  render() {
    return (
      <div className="wrapper">
        <Sidebar />
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header title="Chartjs Dashboard" />
          <div className="content">
            <div className="container">
              <Row>
                <Col lg={3} sm={6}>
                  <div className="chartjs-main">
                    <UsersTotalContainer />
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => ({
  usersLastYear: () => dispatch(fetchUsersLastYear()),
  usersLastMonth: () => dispatch(fetchUsersLastMonth()),
});

export default connect(null, mapDispatchToProps)(MainViews);
