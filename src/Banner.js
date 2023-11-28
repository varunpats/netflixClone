import React from 'react';
import './Banner.css';

export default function Banner() {

    function truncate(str, n) {
        return str?.length > n ? str.substring(0, n - 1) + '...' : str;
    }

    return (
        <header className='banner' style={{
            backgroundImage: `url('https://w0.peakpx.com/wallpaper/342/521/HD-wallpaper-youtube-channel-art-black-black-banner.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center center"
        }}>
            <div className='banner__contents'>
                <h1 className='banner__title'>Movie name</h1>
                <div className='banner__buttons'>
                    <button className='banner__button'>Play</button>
                    <button className='banner__button'>My List</button>
                </div>
                <h1 className='banner__description'>
                    {truncate('Test description', 150)}
                </h1>
            </div>
            <div className='banner__fadeBottom' />
        </header>
    )
}
