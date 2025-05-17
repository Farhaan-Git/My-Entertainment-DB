import { useState ,useEffect} from "react";
import MovieCard from "../components/Movie-Card";
import "../css/Home.css"
import { getAllFavourites,searchMovies } from "../Service/api";



function Home(){

    const[error,setError] = useState(null)
    const[loading,setLoading] = useState(true);

    const [movies,setMovies] = useState([]);

    
    

    useEffect(()=>{
        const loadFavourites = async () =>{
             try{
                const favourites = await getAllFavourites();
                setMovies(favourites.data);
             }   
             catch(err){
                console.log(err)
                setError(err);
             }
             finally{
                setLoading(false);
             }
        };

        loadFavourites();
    },[]) 

    // let movies = [
    //     {id:1,title:"Hello",release_date:"2021"},
    //     {id:2,title:"Byee",release_date:"2025"},
    //     {id:3,title:"Rockstar",release_date:"2012"},
    //     {id:4,title:"UP",release_date:"2015"},
    //     {id:5,title:"It",release_date:"2018"},
    // ];

    const [searchQuery,setSearchQuery] = useState("");


    function handleSearchChange(e){
        setSearchQuery(e.target.value);
    }

    const handleSearch = async (e)=> {
        e.preventDefault()
        if(!searchQuery.trim()) return
        if(loading) return  // incase of loading of favourite movies and same time search

        setLoading(true)
        try{
            const searchResults = await searchMovies(searchQuery);       // search will happen in backend 
            setMovies(searchResults.data.results);

        }
        catch(err){
            console.log(err)
            setError("Failed to search");
        }
        finally{
            setLoading(false);
        }
        setSearchQuery("")
    }

    


    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" placeholder="search for movies..."  value={searchQuery} onChange={handleSearchChange} className="search-input"/>
                <button type="submit" className="search-button">Search</button>
            </form>

{movies.length === 0 ? (
  <div className="movies-not-found">
    <p>No movies were found!</p>
  </div>
) : (
  <>
    {error && <div className="error-message">{error}</div>}

    {loading ? (
      <div className="loading">Loading...</div>
    ) : (
      <div className="movies-grid">
        {movies.map((movie) => (movie.title || movie.name ).toLowerCase().includes(searchQuery.toLowerCase()) &&  
          <MovieCard movie ={movie} key = {movie.id} /> 
        )}
      </div>
    )}
  </>
)}


            

            
        </div>
    )
    
}
export default Home;