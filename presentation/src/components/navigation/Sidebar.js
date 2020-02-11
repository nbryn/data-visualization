import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import Logo from "../../assets/img/jamii.png";

class Sidebar extends Component {
  render() {
    const navLinks = {
      dashboard: "/dashboard",
      search: "/search",
      ngoview: "/ngo-view",
      finance: "/finance",
      groups: "/groups",
      meetings: "/meetings",
      users: "/users",
      engagement: "/engagement",
      profile: "/dashboard"
    };

    return (
      <div
        id="sidebar"
        className="sidebar"
        data-color="black"
        data-image="../../assets/img/jamiipay.jpeg"
      >
        <div className="logo">
          <img src={Logo} />
        </div>

        <div className="sidebar-wrapper">
          <ul className="nav">
            {Object.keys(navLinks).map((element, index) => (
             
              <li key={index}>
                <NavLink
                  to={navLinks[element]}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className="pe-7s-graph" />
                  <p>{element}</p>
                </NavLink>
              </li>
            
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
