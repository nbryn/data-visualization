import React, { Component } from "react";

class SignIn extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: ""
    };
  }

  onSubmit = event => {
    event.preventDefualt();
  };

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h3 className="card-title text-center">Sign In</h3>
                <form onSubmit={this.onSubmit} autoComplete="off">
                  <div className="form-label-group">
                    <input
                      type="email"
                      id="inputEmail"
                      className="form-control"
                      placeholder="Email address"
                      required
                      onChange={this.onChange}
                    />
                    <label for="inputEmail">Email address</label>
                  </div>

                  <div className="form-label-group">
                    <input
                      type="password"
                      id="inputPassword"
                      className="form-control"
                      placeholder="Password"
                      required
                      onChange={this.onChange}
                    />
                    <label for="inputPassword">Password</label>
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

export default SignIn;
