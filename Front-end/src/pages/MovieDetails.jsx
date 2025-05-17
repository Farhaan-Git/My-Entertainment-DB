import "../css/MovieDetails.css"
import { useLocation,useNavigate } from "react-router-dom";

function MovieDetails(){
    const displayNames = new Intl.DisplayNames(['en'], { type: 'language' });

    const navigate = useNavigate()

    const movie = useLocation().state?.movie; 

    function handleAddToFavourites(){
        navigate("/addtofavourites" ,{state : {movie}});
    }

    return(
        <>
            <div className="Movie-details-container">
                <div className="major-details">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.image_location || movie.poster_path}`} alt={movie.name || movie.title} />
                    <div className="attributes">
                        <span>{movie.name || movie.title}</span>
                        <span>{(movie.release_date || movie.first_air_date)? (movie.release_date || movie.first_air_date) : "N/A"}</span>
                        <span>{displayNames.of(movie.original_language)}</span>
                        <span>{movie.ratings || "----"}⭐</span>
                        <span>Last Seen: {movie.last_seen_date || "----"}</span>
                    </div>
                </div>
                
                <button className="addtofav-btn" onClick={handleAddToFavourites}>Add to favourites</button>
                <div className="overview">
                    <h3>Overview:</h3>
                    <p>{movie.overview}</p>
                </div>
                <div className="Review">
                    <h3>Review:</h3>
                    <p>{movie.review || "movie not yet added to favourites add to favourites to create a new review..."}</p>
                </div>

            </div>
        </>
    );
}

export default MovieDetails;