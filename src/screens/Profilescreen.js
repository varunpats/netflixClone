import React from 'react';
import './Profilescreen.css';
import Nav from '../Nav';
import netflixAvatar from '../images/netflix-avatar.png';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';
import Planscreen from './Planscreen';

export default function Profilescreen() {
    const user = useSelector(selectUser)

    return (
        <div className='profilescreen'>
            <Nav />
            <div className='profilescreen_body'>
                <h1>Edit Profile</h1>
                <div className='profilescreen_info'>
                    <img src={netflixAvatar} alt='User profile' />
                    <div className='profilescreen_detail'>
                        <h2>{user.email}</h2>
                        <div className='profilescreen_plans'>
                            <h3>Plans</h3>
                            <Planscreen />
                            <button onClick={() => auth.signOut()} className='profilescreen_signout'>Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
