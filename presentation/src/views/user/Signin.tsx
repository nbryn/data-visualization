import {Card, CardContent} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import React, {ReactElement, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';
import {useDispatch} from 'react-redux';

import * as Thunks from '../../thunks/Thunks';
import Error from '../../util/Error';
import TextField from '../../components/form/TextField';

const {Alert, Button, Col, Grid, Row} = require('react-bootstrap');

const useStyles = makeStyles((theme) => ({
    errorMessage: {
        textAlign: 'center',
    },
    card: {
        marginTop: 70,
        height: 400,
        width: 550,
        float: 'none',
        verticalAlign: 'middle',
        display: 'inline-block',
    },
    row: {
        textAlign: 'center',
        margin: '0 auto',
    },
    formElement: {
        float: 'none',
        verticalAlign: 'middle',
        display: 'inline-block',
    },
    formButton: {
        float: 'none',
        verticalAlign: 'middle',
        display: 'inline-block',
        top: 20,
    },
    formTitle: {
        float: 'none',
        verticalAlign: 'middle',
        display: 'inline-block',
        top: -25,
    },
    spinner: {
        justifyContent: 'center',
    },
}));

const Signin: React.FC = (): ReactElement => {
    const classes = useStyles();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const [loading, setLoading] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            history.push('/dashboard');
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        try {
            event.preventDefault();
            setLoading(true);

            await dispatch(Thunks.login(email, password));

            history.push('/dashboard');
        } catch (error) {
            const errorMessage: string = (error as Error).getErrorMessage();

            setLoading(false);
            setErrorMessage(errorMessage);
        }
    };
    return (
        <Grid fluid>
            <Row className={classes.row}>
                <Col lg={12}>
                    <Card className={classes.card}>
                        <Row className={classes.row}>
                            <Col sm={6} lg={6} className={classes.formElement}>
                                {errorMessage && (
                                    <Alert bsStyle="danger">
                                        <p className={classes.errorMessage}>{errorMessage} - Please try again</p>
                                    </Alert>
                                )}
                            </Col>
                        </Row>
                        <Row className={classes.row}>
                            <Col sm={6} lg={3} className={classes.formTitle}>
                                <h3>Sign In</h3>
                            </Col>
                        </Row>

                        <form onSubmit={handleSubmit} autoComplete="off">
                            {loading ? (
                                <CircularProgress className={classes.spinner} />
                            ) : (
                                <>
                                    <Row className={classes.row}>
                                        <Col sm={6} lg={6} className={classes.formElement}>
                                            <TextField
                                                id="Email"
                                                label="Email"
                                                value={email}
                                                onChange={(event: React.ChangeEvent) => {
                                                    const element = event.currentTarget as HTMLInputElement;
                                                    setEmail(element.value);
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className={classes.row}>
                                        <Col sm={6} lg={6} className={classes.formElement}>
                                            <TextField
                                                id="Password"
                                                label="Password"
                                                value={password}
                                                onChange={(event: React.ChangeEvent) => {
                                                    const element = event.currentTarget as HTMLInputElement;
                                                    setPassword(element.value);
                                                }}
                                            />
                                        </Col>
                                    </Row>

                                    <Row className={classes.row}>
                                        <Col sm={6} lg={6} className={classes.formButton}>
                                            <Button bsStyle="primary" bsSize="large" className="btn-block" type="submit">
                                                Sign in
                                            </Button>
                                        </Col>
                                    </Row>
                                </>
                            )}
                        </form>
                    </Card>
                </Col>
            </Row>
        </Grid>
    );
};

export default Signin;
