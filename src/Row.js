import React, { useEffect, useState } from 'react';
import instance from './axios';
import './Row.css';

export default function Row({ title, fetchUrl, isLargeRow = false }) {
    const [movies, setMovies] = useState([]);

    const base_url = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        async function fetchData() {
            const req = await instance.get(fetchUrl);
            setMovies(req.data.results);
            return req;
        }

        fetchData();
    }, [fetchUrl])

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className='row_posters'>
                {movies.map((movie) => (
                    ((isLargeRow && movie.poster_path) ||
                        (!isLargeRow && movie.backdrop_path)) && (
                        <img
                            key={movie?.id}
                            src={`${base_url}${isLargeRow ? movie?.poster_path : movie?.backdrop_path}`}
                            className={`row_poster ${isLargeRow && 'row_posterLarge'}`}
                            alt={movie?.name} />
                    ))
                )}
            </div>
        </div>
    )
}
