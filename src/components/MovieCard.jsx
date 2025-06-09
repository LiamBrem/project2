import React from 'react';
import './MovieCard.css'; // Assuming you have a CSS file for styling


const MovieCard = ({ movie }) => {
    console.log(movie)
    return (
        <div className="movie-card">
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
        </div>
    )
}

export default MovieCard;