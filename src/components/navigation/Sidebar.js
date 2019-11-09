import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class Sidebar extends Component {
  render() {
    return (
      <div
        id="sidebar"
        className="sidebar"
        data-color="black"
        data-image="../../assets/img/sidebar-3.jpg"
      >
        <div className="logo"></div>
        <div className="sidebar-wrapper">
          <ul className="nav">
            <li>
              <NavLink
                to="/dashboard"
                className="nav-link"
                activeClassName="active"
              >
                <i className="pe-7s-graph" />
                <p>Dashboard</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className="nav-link"
                activeClassName="active"
              >
                <i className="pe-7s-user" />
                <p>Profile</p>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
