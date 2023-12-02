import React, { useState } from 'react';
import netflixLogo from '../images/netflix-logo.png';
import './Loginscreen.css';

export default function Loginscreen() {
    const [signIn, setSignIn] = useState(false);
    return (
        <div className='loginscreen'>
            <div className='loginscreen_background'>
                <img src={netflixLogo} className='loginScreenLogo' />
                <button onClick={() => setSignIn(true)} className='signIn'>
                    Sign In
                </button>
                <div className='loginScreen_gradient' />
            </div>
            <div className='loginScreen_body'>
                <>
                    <h1>Unlimited films, TV programmes and more.</h1>
                    <h2>Watch anywhere. Cancel at any time.</h2>
                    <h3>Ready to watch? Enter your email to create or restart your memborship.</h3>
                    <div className='loginscreen_input'>
                        <form>
                            <input type='email' placeholder='Email Address' />
                            <button onClick={() => setSignIn(true)} className='loginscreen_start'>
                                GET STARTED
                            </button>
                        </form>
                    </div>
                </>
            </div>
        </div>
    )
}
