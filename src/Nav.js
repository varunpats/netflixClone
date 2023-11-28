import React, { useEffect, useState } from 'react';
import netflixLogo from './images/netflix-logo.png';
import netflixAvatar from './images/netflix-avatar.png';
import './Nav.css';

export default function Nav() {
    const [show, handleShow] = useState(false);

    const transitionNavbar = () => {
        if (window.scrollY > 100) {
            handleShow(true);
        } else {
            handleShow(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', transitionNavbar);

        return () => window.removeEventListener('scroll', transitionNavbar);
    }, [])

    return (
        <div className={`nav ${show && "nav__black"}`}>
            <div className='nav__contents'>
                <img className='nav__logo' src={netflixLogo} alt='Netflix logo' />
                <img className='nav__avatar' src={netflixAvatar} alt='User profile' />
            </div>
        </div>
    )
}
