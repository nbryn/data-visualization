import React, { Component } from "react";
import { Col } from "react-bootstrap";
import { LineChart, Line, CartesianGrid, YAxis, XAxis } from "recharts";

class Graph extends Component {
  render() {
    return (
      <div container>
        <div className="card-graph card-stats">
          <div className="content">
            <Col xs={8}>
              <div className="numbers">
                <p>{this.props.title}</p>
              </div>
            </Col>
            <LineChart width={350} height={300} data={this.props.data}>
              <XAxis label={this.props.xLabel} dataKey="name" />
              <YAxis label={this.props.ylabel} />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <Line
                strokeWidth={3}
                type="monotone"
                dataKey="uv"
                stroke={this.props.stroke}
              />
            </LineChart>
          </div>
        </div>
      </div>
    );
  }
}
export default Graph;
