import React, { useEffect, useState } from 'react';
import './Banner.css';
import instance from './axios';
import requests from './Requests';

export default function Banner() {
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const req = await instance.get(requests.fetchNetflixOriginals);
            setMovie(
                req.data.results[
                Math.floor(Math.random() * req.data.results.length - 1)
                ]
            );
            return req;
        }

        fetchData();
    }, []);

    function truncate(str, n) {
        return str?.length > n ? str.substring(0, n - 1) + '...' : str;
    }

    return (
        <header className='banner' style={{
            backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8) 0, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.8) 100%), url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')`,
            backgroundSize: "cover",
            backgroundPosition: "center center"
        }}>
            <div className='banner__contents'>
                <h1 className='banner__title'>{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className='banner__buttons'>
                    <button className='banner__button'>Play</button>
                    <button className='banner__button'>My List</button>
                </div>
                <h1 className='banner__description'>
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>
            <div className='banner__fadeBottom' />
        </header>
    )
}
