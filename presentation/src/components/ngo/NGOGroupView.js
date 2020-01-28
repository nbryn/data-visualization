import React, { Component } from 'react';


import Sidebar from "../navigation/Sidebar";
import Header from "../navigation/Header";

class NGOGroupView extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        console.log(this.props);
    }
    render() {
        return (
            <div className="wrapper">
        <Sidebar />

        <div id="main-panel" className="main-panel" ref="mainPanel">
          <Header
            title={`Group: ${this.props.groupInfo.name}`}
          
          />
                <h4></h4>
            </div>
            /</div>
        );
    }
}

export default NGOGroupView;