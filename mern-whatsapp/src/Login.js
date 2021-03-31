import React from 'react'
import { Button } from '@material-ui/core';
import { actionTypes } from './reducer';
import { useStateValue } from './StateProvider';

import './Login.css';

import { auth, provider } from './firebase';


function Login() {
    const [{}, dispatch] = useStateValue();

    const signIn = () => {
        auth
            .signInWithPopup(provider)
            .then((result) => {
                dispatch({
                    type: actionTypes.SET_USER,
                    user: result.user,
                });
            })
            .catch((error) => alert(error.message));
    };

    return (
        <div className='login'>
            <div className='login__container'>
                <img
                    src='https://www.freepnglogos.com/uploads/whatsapp-logo-light-green-png-0.png' // whatsapp logo
                    alt='whatsapp logo'
                />
                <div className='login__text'>
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button onClick={signIn}>
                    Login with Google
                </Button>
            </div>
        </div>
    );
}

export default Login;
