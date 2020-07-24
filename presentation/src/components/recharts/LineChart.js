import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Col } from "react-bootstrap";
import {
  CartesianGrid,
  Line,
  LineChart as Chart,
  ResponsiveContainer,
  YAxis,
  XAxis,
} from "recharts";

class LineChart extends Component {
  render() {
    const { data, xLabel, yLabel, stroke, title } = this.props;
    return (
      <ResponsiveContainer width={400} height="80%">
        <div className="content">
          <Col xs={8}>
            <div className="numbers">
              <p>{title}</p>
            </div>
          </Col>
          {!data ? (
            <div className="spinner">
              <CircularProgress />
            </div>
          ) : (
            <Chart width={350} height={300} data={data}>
              <XAxis label={xLabel} dataKey="name" />
              <YAxis label={yLabel} dataKey="value" />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line
                strokeWidth={3}
                type="monotone"
                dataKey="value"
                stroke={stroke}
              />
            </Chart>
          )}
        </div>
      </ResponsiveContainer>
    );
  }
}
export default LineChart;
