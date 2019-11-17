import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/sass/dashboard.scss?v=1.3.0";
import "./assets/fonts/pe-icon-7-stroke.css";

import Store from "./Store";
import Dashboard from "./components/dashboard/Dashboard.js";
import Signin from "./components/user/Signin.js";
import Profile from "./components/user/UserProfile.js";
import SecureRoute from "./security/SecureRoute";

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <Router>
          <Route exact path="/" component={Signin} />
          <Switch>
            <SecureRoute exact path="/dashboard" component={Dashboard} />
            <SecureRoute exact path="/profile" component={Profile} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
