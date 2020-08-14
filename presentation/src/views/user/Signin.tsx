import {useDispatch, useSelector} from 'react-redux';
import React, {ReactElement, useEffect, useState} from 'react';
import {useHistory} from 'react-router-dom';

import * as Thunks from '../../thunks/Thunks';
import {RootState} from '../../store/index';

const {Alert} = require('react-bootstrap');

const Signin: React.FC = (): ReactElement => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const errorMessage: string = useSelector<RootState, string>((state) => state.general.loginError);

    const dispatch = useDispatch();
    let history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            history.push('/dashboard');
        }
    }, []);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        await dispatch(Thunks.login(email, password, history));
    };
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    {errorMessage && (
                        <Alert bsStyle="danger">
                            <p style={{textAlign: 'center'}}>{errorMessage} - Please try again</p>
                        </Alert>
                    )}
                    <div className="card card-signin my-5">
                        <div className="card-body">
                            <h3 className="card-title text-center">Sign In</h3>
                            <form onSubmit={handleSubmit} autoComplete="off">
                                <div className="form-label-group">
                                    <input
                                        id="inputEmail"
                                        name="email"
                                        className="form-control"
                                        placeholder="Email address"
                                        value={email}
                                        required
                                        onChange={(event: React.ChangeEvent) => {
                                            const element = event.currentTarget as HTMLInputElement;
                                            setEmail(element.value);
                                        }}
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
                                        value={password}
                                        required
                                        onChange={(event: React.ChangeEvent) => {
                                            const element = event.currentTarget as HTMLInputElement;
                                            setPassword(element.value);
                                        }}
                                    />
                                    <label htmlFor="inputPassword">Password</label>
                                </div>

                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">
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
};

export default Signin;
