import React, { Component } from 'react';

import { Col } from "react-bootstrap";

import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer 
  } from 'recharts';

class Barr extends Component {
    render() {
        return (
            <ResponsiveContainer width={400} height="80%">
        <div className="card-circle card-stats">
          <div className="content">
            <Col xs={8}>
              <div className="numbers">
                <p>{this.props.title}</p>
              </div>
            </Col>
          <BarChart
            width={400}
            height={300}
            data={this.props.data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={this.props.yLabel} />        
            <Bar dataKey="value" fill="#8884d8" />
            >
          </BarChart>
          </div>
          </div>
          </ResponsiveContainer>
        );
      }
}

export default Barr;