import React, { Component } from "react";
import { Col } from "react-bootstrap";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  YAxis,
  XAxis
} from "recharts";

class GraphChart extends Component {
  render() {
    return (
      <ResponsiveContainer width={400} height="80%">
       
          <div className="content">
            <Col xs={8}>
              <div className="numbers">
                <p>{this.props.title}</p>
              </div>
            </Col>
            <LineChart width={350} height={300} data={this.props.data}>
              <XAxis label={this.props.xLabel} dataKey="name" />
              <YAxis label={this.props.ylabel} dataKey="value"/>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line
                strokeWidth={3}
                type="monotone"
                dataKey="value"
                stroke={this.props.stroke}
              />
            </LineChart>
          </div>
        
      </ResponsiveContainer>
    );
  }
}
export default GraphChart;
