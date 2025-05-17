import { useLocation,useNavigate } from "react-router-dom";
import { useState } from "react";
import '../css/AddToFavourites.css';
import Rating from '@mui/material/Rating';
import { addToFavourites } from "../Service/api";

function AddToFavourites() {
  const movie = useLocation().state?.movie;
//   const navigate = useNavigate();

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);
  const [submitStage,setSubmitStage] = useState(false);

  const [formData, setFormData] = useState({
    last_seen_date: '',
    review: '',
    ratings: 1, 
  });

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRatingChange = (event, newValue) => {
    setFormData((prev) => ({
      ...prev,
      ratings: newValue,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const favourite = {
      api_id: movie.id,
      original_language: movie.original_language,
      name: movie.title || movie.name,
      overview: movie.overview,
      release_date: movie.release_date || movie.first_air_date || null,
      review: formData.review,
      ratings: formData.ratings,
      last_seen_date: formData.last_seen_date,
      image_location: movie.poster_path || movie.image_location || null,
    };

    try{
        const results = await addToFavourites(favourite);       // search will happen in backend 
        results.message ;
        setSubmitStage(true);
        // navigate("/");
    }
    catch(err){
        console.log(err)
        setError("Failed to submit");
    }
    finally{
        setLoading(false);
    }
    console.log("Submited favourite:");
  };
  return (
    <>
    {submitStage && <div className="submitted">Submitted sucessfully...</div>}
    {loading? (<div className="submitting"> submitting the form</div>) : <div className="add-to-fav">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.image_location || movie.poster_path}`}
        alt={movie.name || movie.title}
      />
      <div className="minor-details">
        <h3>{movie.name || movie.title}</h3>
        <p>
          {(movie.release_date || movie.first_air_date)
            ? (movie.release_date || movie.first_air_date).split("-")[0]
            : "N/A"}
        </p>
      </div>

      <form onSubmit={handleFormSubmit}>
        <label htmlFor="last_seen_date">Enter the last seen date:</label>
        <input
          type="date"
          name="last_seen_date"
          value={formData.last_seen_date}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="rating">Rate the movie:</label>
        <Rating
          name="rating"
          max={10}
          precision={0.5}
          value={formData.ratings}
          onChange={handleRatingChange}
          required
        />

        <label htmlFor="review">Your Review:</label>
        <textarea
          name="review"
          className="review"
          placeholder="Enter your review here..."
          value={formData.review}
          onChange={handleInputChange}
        />

        <button type="submit">Add to Favourites</button>
      </form>
    </div>
    
    }
    
    </>
  );
}

export default AddToFavourites;
