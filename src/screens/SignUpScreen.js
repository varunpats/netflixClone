import React from 'react';
import './SignUpScreen.css';

export default function SignUpScreen() {
    return (
        <div className='signUpScreen'>
            <form>
                <h1>Sign In</h1>
                <input type='email' placeholder='Email' />
                <input type='password' placeholder='Password' />
                <button type='submit'>Sign In</button>
                <h4>
                    <span className='signup_grey'>New to Netflix? </span>
                    <span className='signup_link'>Sign up now.</span>
                </h4>
            </form>
        </div>
    )
}
