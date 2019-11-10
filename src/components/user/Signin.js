import React, { Component } from "react";

import { login } from "../../actions/UserActions";
import { throwStatement } from "@babel/types";

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const email = this.state.email;
    const password = this.state.password;

    login(email, password);
  }

  
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h3 className="card-title text-center">Sign In</h3>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                  <div className="form-label-group">
                    <input
                      type="email"
                      id="inputEmail"
                      name="email"
                      className="form-control"
                      placeholder="Email address"
                      required
                      onChange={this.handleChange}
                    />
                    <label htmlFor="inputEmail">Email address</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      name="password"
                      className="form-control"
                      placeholder="Password"
                      required
                      onChange={this.handleChange}
                    />
                    <label htmlFor="inputPassword">Password</label>
                  </div>

                  <button
                    className="btn btn-lg btn-primary btn-block text-uppercase"
                    type="submit"
                  >
                    Sign in
                  </button>
                  <hr className="my-4" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;
