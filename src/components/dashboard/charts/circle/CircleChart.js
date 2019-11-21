import React, { Component } from "react";

import { Col } from "react-bootstrap";

import { ResponsiveContainer, Cell, PieChart, Pie } from "recharts";

class CircleChart extends Component {
  render() {
    const colors = [
      "#8884d8",
      "#83a6ed",
      "#d0ed57",
      "#a4de6c",
      "#8ddlel",
      "#82ca9d"
    ];

    return (
      <ResponsiveContainer width={400} height="80%">
        <div className="card-circle card-stats">
          <div className="content">
            <Col xs={8}>
              <div className="numbers">
                <p>{this.props.title}</p>
              </div>
            </Col>
            <PieChart width={400} height={300}>
              <Pie
                dataKey="value"
                nameKey="name"
                data={this.props.data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#82ca9d"
              >
                {this.props.data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>
      </ResponsiveContainer>
    );
  }
}

export default CircleChart;
