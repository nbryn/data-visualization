import React, { Component } from 'react';
import Graph from "./Graph";

class MoneyGraph extends Component {
    render() {
        const data = [
            {
              name: "0",
              uv: 0,
              amt: 2400
            },
            {
              name: "5",
              uv: 623,
              amt: 2210
            },
            {
              name: "10",
              uv: 750,
              amt: 2290
            },
            {
              name: "15",
              uv: 901,
              amt: 2000
            },
            {
              name: "20",
              uv: 1203,
              amt: 2181
            },
            {
              name: "25",
              uv: 1423,
              amt: 2500
            },
            {
              name: "30",
              uv: 1674,
              amt: 2100
            }
          ];
        return (
            <div>
                <Graph title="Amount Registrered" data={data} stroke="#82ca9d"/>
            </div>
        );
    }
}

export default MoneyGraph;