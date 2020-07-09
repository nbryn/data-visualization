import React, { Component } from "react";

import { Col } from "react-bootstrap";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

class Barr extends Component {
  render() {
    const { data, color, yLabel, xLabel, title } = this.props;
    return (
      <ResponsiveContainer width={400} height="80%">
        <div className="content">
          <Col xs={8}>
            <div className="numbers">
              <p>{title}</p>
            </div>
          </Col>
          <BarChart
            width={400}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis label={xLabel} dataKey="name" />
            <YAxis label={yLabel} />
            <Bar dataKey="value" fill={color} />
          </BarChart>
        </div>
      </ResponsiveContainer>
    );
  }
}

export default Barr;
