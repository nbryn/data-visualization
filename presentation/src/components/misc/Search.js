import React, { Component } from "react";

import { Grid, Row, Col } from "react-bootstrap";
import { FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";

import Sidebar from "../navigation/Sidebar";
import Header from "../navigation/Header";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchString: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    const { searchString } = this.state;
    
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }
  render() {
    return (
      <div>
        <div className="wrapper">
          <Sidebar />

          <div id="main-panel" className="main-panel" ref="mainPanel">
            <Header
              title="Group Search
          "
            />
            <div className="content">
              <Grid fluid>
                <Row>
                  <div className="search-field">
                    <form onSubmit={this.onSubmit}>
                      <FormGroup controlId="formSearch">
                        <ControlLabel>Search</ControlLabel>
                        <FormControl
                          type="text"
                          placeholder="Group Name"
                          name="searchString"
                          value={this.state.searchString}
                          onChange={this.onChange}
                        />
                      </FormGroup>
                      <Button variant="primary" type="submit">
                        Search
                      </Button>
                    </form>
                  </div>
                </Row>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Search;
