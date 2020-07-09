import React, { Component } from "react";
import { Col } from "react-bootstrap";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
  XAxis,
} from "recharts";

class GraphChart extends Component {
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
          <LineChart width={350} height={300} data={data}>
            <XAxis label={xLabel} dataKey="name" />
            <YAxis label={yLabel} dataKey="value" />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <Line
              strokeWidth={3}
              type="monotone"
              dataKey="value"
              stroke={stroke}
            />
          </LineChart>
        </div>
      </ResponsiveContainer>
    );
  }
}
export default GraphChart;
