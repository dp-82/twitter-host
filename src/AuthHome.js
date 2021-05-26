import React from 'react'
import './index.css';
import { Link } from 'react-router-dom';

const AuthHome = () => {

    if (sessionStorage.getItem('username') !== null) {
        window.location.href = '/home';
    }

    // window.location.href = '/login';

    return (
        <div className="auth-home">
            <div className="auth-home-left">
                <img src="twitter.png" alt="twitter-img" />
            </div>
            <div className="auth-home-right">
                <img src="logo.png" alt="twitterLogo" /><br />
                <h1>Happening now</h1>
                <h2>Join Twitter today.</h2>
                <Link to="/register" style={{ textDecoration: 'none' }}>
                    <h5 className="signUp">Sign up</h5>
                </Link><br />
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    <h5 className="logIn">Log in</h5>
                </Link>

            </div>
        </div>
    )
}

export default AuthHome
