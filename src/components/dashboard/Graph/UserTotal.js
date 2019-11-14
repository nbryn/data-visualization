import React, { Component } from 'react';
import Graph from "./Graph";

class UserTotal extends Component {
    render() {
        const data = [
            {
              name: "0",
              uv: 0,
              amt: 2400
            },
            {
              name: "5",
              uv: 40,
              amt: 2210
            },
            {
              name: "10",
              uv: 111,
              amt: 2290
            },
            {
              name: "15",
              uv: 178,
              amt: 2000
            },
            {
              name: "20",
              uv: 203,
              amt: 2181
            },
            {
              name: "25",
              uv: 450,
              amt: 2500
            },
            {
              name: "30",
              uv: 748,
              amt: 2100
            }
          ];
          return (
            <div>
              <Graph title="Total Users" data={data} stroke="#82ca9d" />
            </div>
          );
        }
      }
      
      export default UserTotal;