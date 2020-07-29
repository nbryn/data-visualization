import CircularProgress from "@material-ui/core/CircularProgress";
import React, { ReactElement } from "react";

const { Col, Row } = require("react-bootstrap");

type Props = {
  statsValue: number;
  statsText: string;
  statsIcon: string;
  statsIconText: string;
  bigIcon: string;
};

const KPICard: React.FC<Props> = ({
  statsValue,
  statsText,
  statsIcon,
  statsIconText,
  bigIcon,
}: Props): ReactElement => {
  return (
    <div className="card card-stats">
      <div className="content">
        <Row>
          <Col xs={5} lg={5}>
            <div className="icon-big text-center icon-warning">
              <i className={bigIcon} />
            </div>
          </Col>
          <Col xs={7} lg={7}>
            <div className="numbers">
              <p>{statsText}</p>
              {statsValue || <CircularProgress />}
            </div>
          </Col>
        </Row>
        <div className="footer">
          <hr />
          <div className="stats">
           <i className={statsIcon}/> {statsIconText}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KPICard;
