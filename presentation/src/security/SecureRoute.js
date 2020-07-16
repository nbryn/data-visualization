import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

class SecureRoute extends Component {
  render() {
    const Component = this.props.component;
    const token = localStorage.getItem("Token");
    return (
      <Route>
        {token ? <Component {...this.props} /> : <Redirect to="/" />}
      </Route>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(SecureRoute);
