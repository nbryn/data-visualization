import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Col, Row } from "react-bootstrap";

export class KPICard extends Component {
  render() {
    const {
      statsValue,
      statsText,
      statsIcon,
      statsIconText,
      bigIcon,
    } = this.props;
    return (
      <div className="card card-stats">
        <div className="content">
          <Row>
            <Col xs={5}>
              <div className="icon-big text-center icon-warning">{bigIcon}</div>
            </Col>
            <Col xs={7}>
              <div className="numbers">
                <p>{statsText}</p>
                {statsValue || <CircularProgress />}
              </div>
            </Col>
          </Row>
          <div className="footer">
            <hr />
            <div className="stats">
              {statsIcon} {statsIconText}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default KPICard;
