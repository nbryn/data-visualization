import {connect} from 'react-redux';
import {Navbar, NavItem, Nav} from 'react-bootstrap';
import React, {Component} from 'react';

import * as Thunks from '../../thunks/Thunks';

class Header extends Component {
    constructor(props) {
        super(props);
        this.mobileSidebarToggle = this.mobileSidebarToggle.bind(this);
        this.state = {
            sidebarExists: false,
        };
    }

    mobileSidebarToggle(e) {
        if (this.state.sidebarExists === false) {
            this.setState({
                sidebarExists: true,
            });
        }
        e.preventDefault();
        document.documentElement.classList.toggle('nav-open');
        const node = document.createElement('div');
        node.id = 'bodyClick';
        node.onclick = function () {
            this.parentElement.removeChild(this);
            document.documentElement.classList.toggle('nav-open');
        };
        document.body.appendChild(node);
    }
    render() {
        return (
            <Navbar fluid>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="#/dashboard">{this.props.title}</a>
                    </Navbar.Brand>
                    <Navbar.Toggle onClick={this.mobileSidebarToggle} />
                </Navbar.Header>
                <Navbar.Collapse>
                    <div>
                        <Nav>
                            <NavItem href="#">
                                <p className="hidden-lg hidden-md">Dashboard</p>
                            </NavItem>
                        </Nav>
                        <Nav pullRight>
                            <NavItem href="#">Account</NavItem>
                            <NavItem href="#/" onClick={this.props.signout}>
                                Log out
                            </NavItem>
                        </Nav>
                    </div>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapDispatchToProps = (dispatch) => ({
    signout: () => dispatch(Thunks.logout()),
});

export default connect(null, mapDispatchToProps)(Header);
