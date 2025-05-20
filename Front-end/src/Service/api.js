const BASE_API_URL = "http://localhost:3000"

// export const getPopularMovies = async () => {
//     const response = await fetch(`${BASE_API_URL}/movie/popular?api_key=${API_KEY}`);
//     const data = await response.json();
//     return data.results;
// };

export const searchMovies = async (query) =>{
    const response = await fetch(`${BASE_API_URL}/api/v1/search?element=${encodeURIComponent(query)}`);
    return await response.json();
    
};

export const getAllFavourites = async () =>{
    const response = await fetch(`${BASE_API_URL}/api/v1/getallfavourites`);
    return await response.json();
    
}

export const addToFavourites = async (movie) =>{
    console.log(`movie reached api.js ${movie}`);
    const response = await fetch (`${BASE_API_URL}/api/v1/addtofavourites`,{
        method: "POST",
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(movie),
    });
    return await response.json();
    
}