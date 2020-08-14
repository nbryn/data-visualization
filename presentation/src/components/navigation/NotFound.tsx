import React, {ReactElement} from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';

import PageNotFound from '../../assets/img/PageNotFound.png';

const useStyles = makeStyles((theme) => ({
    link: {
        textAlign: 'center',
    },
}));

const NotFound: React.FC = (): ReactElement => {
    const classes = useStyles();
    return (
        <>
            <img
                src={PageNotFound}
                style={{
                    width: 500,
                    height: 500,
                    display: 'block',
                    margin: 'auto',
                    position: 'relative',
                }}
            />
            <div className={classes.link}>
                <Link className={classes.link} to="/dashboard">
                    Return to Dashboard
                </Link>
            </div>
        </>
    );
};

export default NotFound;
