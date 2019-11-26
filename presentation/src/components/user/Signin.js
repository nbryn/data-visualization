import React, { Component } from "react";
import { Alert } from "react-bootstrap";

import { connect } from "react-redux";
import { login } from "../../redux/actions/User/LoginAction";

class Signin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      showAlert: false,
      errorMessage: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const token = localStorage.getItem("token");

    if (token) {
      this.props.history.push("/dashboard");
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const email = this.state.email;
    const password = this.state.password;

    // Login returns error if login fails
    const loginError = await this.props.login(
      email,
      password,
      this.props.history
    );

    if (loginError) {
      this.setState({
        email: "",
        password: "",
        showAlert: true,
        errorMessage: loginError
      });
    }
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            {this.state.showAlert ? (
              <Alert bsStyle="danger">
                

                <p style={{ textAlign: "center" }}>
                  {this.state.errorMessage} - Please try again
                </p>
              </Alert>
            ) : (
              ""
            )}
            <div className="card card-signin my-5">
              <div className="card-body">
                <h3 className="card-title text-center">Sign In</h3>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                  <div className="form-label-group">
                    <input
                      id="inputEmail"
                      name="email"
                      className="form-control"
                      placeholder="Email address"
                      value={this.state.email}
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
                      value={this.state.password}
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

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, { login })(Signin);
