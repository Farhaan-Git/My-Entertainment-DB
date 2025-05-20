import express from 'express'
import cors from 'cors'
import pool from './db.js'
import dotenv from 'dotenv'

dotenv.config()


const API_KEY = process.env.API_KEY;
const BASE_API_URL = "https://api.themoviedb.org/3"
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

function responseWithData(message,data){
    return {
        message : message,
        data : data
    }
}

function responseWithoutData(message){
    return {
        message : message
    }
}

app.get('/api/v1/getallfavourites', async (req,res) =>{
    try{
        const favourites = await pool.query(`select * from favourites_table`);
        res.status(200).json(responseWithData("found all favourites",favourites.rows));
    }
    catch(err){
        res.status(404).json(responseWithoutData("error happend while retreiving favourites"));
    }
});

app.get('/api/v1/search', async (req,res)=>{
    const searchElement = req.query.element;
    try{
        const responseForMoviesUnfiltered = await fetch(`${BASE_API_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchElement)}`);
        const responseForSeriesUnfiltered = await fetch(`${BASE_API_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(searchElement)}`);
        const responseForMovies = await responseForMoviesUnfiltered.json();
        const responseForSeries = await responseForSeriesUnfiltered.json();

        let response = {
            page : Math.max(responseForMovies.page,responseForSeries.page),
            results : [...responseForMovies.results,...responseForSeries.results],
            total_pages : Math.max(responseForMovies.total_pages,responseForSeries.total_pages),
            total_results : responseForMovies.total_results + responseForSeries.total_results
        };
        // const queryres = await pool.query(`select api_id from favourites_table`);
        // const favourites_id = [...queryres.rows];
        res.status(200).json(responseWithData("search elements found succesfully",response));
    }
    catch(err){
        console.log(err);
        res.status(404).json(responseWithoutData("error occured while searching!"));
    }
});

app.post("/api/v1/addtofavourites", async (req,res)=>{
    const elementToAdd = req.body ;
    const values = Object.values(elementToAdd);
    try{
        const temp = await pool.query(`INSERT INTO favourites_table (
                                    api_id,
                                    original_language,
                                    name,
                                    overview,
                                    release_date,
                                    review,
                                    ratings,
                                    last_seen_date,
                                    image_location
                                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                                RETURNING *;`,values);
        res.status(200).json(responseWithoutData("Movie/Series was added to the database"));
    }
    catch(err){
        console.log(err);
        res.status(400).json(responseWithoutData("Movie/series was not added to the database"));
    }
});


app.listen(PORT , () => console.log(`server running on ${PORT}`));


