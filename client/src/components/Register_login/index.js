import React from 'react';
import MyButton from '../utils/button';
import Login from './login';

const RegisterLogin = () => {
    return (
        <div className="page_wrapper">
            <div className="container">
                <div className="register_login_container">
                    <div className="left">
                        <h1>New Users</h1>
                        <p> As the fast-growing availabiltity of scientific literature online, many researchers can have trouble keeping track of the overwhelming amount of literature published in respective domains. We are here to provide a comprehensive collection of similar studies to a paper of our interest when drafting a new paper! </p>
                        <MyButton
                            type="default"
                            title="Create an account"
                            linkTo="/register"
                            addStyles={{
                                margin:'10px 0 0 0'
                            }}
                        />
                    </div>
                    <div className="right">
                        <h2>Registered users</h2>
                        <p>If you have an account please log in.</p>
                        <Login/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterLogin;