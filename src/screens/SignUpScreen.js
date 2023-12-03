import React, { useRef } from 'react';
import { auth } from '../firebase';
import './SignUpScreen.css';

export default function SignUpScreen() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const register = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value).then((user) => {
                console.log(user);
            }).catch(err => alert(err.message));
    }

    const signIn = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((user) => {
            console.log(user);
        }).catch(err => alert(err.message));
    }

    return (
        <div className='signUpScreen'>
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} type='email' placeholder='Email' />
                <input ref={passwordRef} type='password' placeholder='Password' />
                <button type='submit' onClick={signIn}>Sign In</button>
                <h4>
                    <span className='signup_grey'>New to Netflix? </span>
                    <span className='signup_link' onClick={register}>Sign up now.</span>
                </h4>
            </form>
        </div>
    )
}
