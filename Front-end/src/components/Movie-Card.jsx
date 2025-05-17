import '../css/MovieCard.css'
import {useNavigate } from "react-router-dom";


function MovieCard({movie}){
    const navigate = useNavigate()

    function onFavouriteClick(){
        alert("clicked!");
    }

    function handleMovieCardClick (movie){
      navigate("/moviedetails",{state: {movie}});
    }

    return(
       <div className="movie-card" onClick = {() => handleMovieCardClick(movie) }>
            <div className="movie-poster" >
                <img src={`https://image.tmdb.org/t/p/w500${movie.image_location || movie.poster_path}`} alt={movie.name || movie.title} />
            </div>
            <div className="movie-overlay">
                <button className="favourite-btn" onClick={onFavouriteClick}>
                    ♥
                </button>
            </div>
            <div className="movie-info">
                <h3>{movie.name || movie.title}</h3>
                <p> {(movie.release_date || movie.first_air_date)? (movie.release_date || movie.first_air_date).split("-")[0] : "N/A"}</p>
            </div>
        </div>
    );
}

export default MovieCard