import React, { Component } from "react";
import Graph from "./Graph.js";

class UserGraph extends Component {
  render() {
    const data = [
      {
        name: "0",
        uv: 12,
        amt: 2400
      },
      {
        name: "5",
        uv: 29,
        amt: 2210
      },
      {
        name: "10",
        uv: 41,
        amt: 2290
      },
      {
        name: "15",
        uv: 54,
        amt: 2000
      },
      {
        name: "20",
        uv: 61,
        amt: 2181
      },
      {
        name: "25",
        uv: 75,
        amt: 2500
      },
      {
        name: "30",
        uv: 88,
        amt: 2100
      }
    ];
    return (
      <div>
        <Graph title="Users Last Month" data={data} stroke="#83ca9d" />
      </div>
    );
  }
}

export default UserGraph;
