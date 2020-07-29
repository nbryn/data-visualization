import React, { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import { useHistory } from 'react-router-dom';

import Logo from '../../assets/img/dashboard.jpeg';

type Links = {
    [key: string]: string;
};

const Sidebar: React.FC = (): ReactElement => {
    let history = useHistory();
    const chartjsLinks: Links = {
        dashboard: '/chartjs-main',
    };

    const rechartsLinks: Links = {
        dashboard: '/dashboard',
        groups: '/groups',
        users: '/users',
        finance: '/finance',
        meetings: '/meetings',
        // engagement: "/engagement",
    };

    const miscLinks: Links = {
        profile: '/profile',
        ngoview: '/ngo-view',
        search: '/search',
    };

    const createLink = () => {
        history.push('/groups');
    };

    const drawer = (
        <>
            <li>
                <Button onClick={() => createLink()}>
                    <i className="pe-7s-graph" />
                </Button>
            </li>
        </>
    );

    return (
        <div
            id="sidebar"
            className="sidebar"
            data-color="black"
            data-image="../../assets/img/dashboard.png"
        >
            <div className="logo">
                <img src={Logo} />
            </div>

            <div className="sidebar-wrapper">
                <ul className="nav">
                    <li>Chartjs</li>

                    {drawer}

                    {Object.keys(chartjsLinks).map((element, index) => (
                        <li key={index}>
                            <NavLink
                                to={chartjsLinks[element]}
                                className="nav-link"
                                activeClassName="active"
                            >
                                <i className="pe-7s-graph" />
                                <p>{element}</p>
                            </NavLink>
                        </li>
                    ))}

                    <li>Recharts</li>
                    {Object.keys(rechartsLinks).map((element, index) => (
                        <li key={index}>
                            <NavLink
                                to={rechartsLinks[element]}
                                className="nav-link"
                                activeClassName="active"
                            >
                                <i className="pe-7s-graph" />
                                <p>{element}</p>
                            </NavLink>
                        </li>
                    ))}
                    <li>Misc</li>
                    {Object.keys(miscLinks).map((element, index) => (
                        <li key={index}>
                            <NavLink
                                to={miscLinks[element]}
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
};

export default Sidebar;
