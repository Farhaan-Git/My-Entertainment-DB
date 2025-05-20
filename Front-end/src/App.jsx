import Popular from "./pages/Popular";
import Home from "./pages/Home";
import {Routes,Route} from 'react-router-dom'
import NavBar from "./components/Nav-Bar";
import "./css/App.css"
import MovieDetails from "./pages/MovieDetails";
import AddToFavourites from "./pages/AddToFavourites";

function App() {
  return (
    <div>
      <NavBar/>
    <main>
      <Routes>
        <Route path="/" element= {<Home/>}/>
        <Route path="/popular" element={<Popular/>} />
        <Route path="/moviedetails" element = {<MovieDetails/>} />
        <Route path="/addtofavourites" element ={<AddToFavourites/>}/>
      </Routes>
    </main>
    </div>
  );
}

export default App
