import { Link } from "react-router-dom"
import '../css/NavBar.css'

function NavBar(){

    return(
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" >My Watching</Link>
                </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link" >Home</Link>
                <Link to="/popular" className="nav-link" >Popular</Link>
            </div>
        </nav>
    );
}

export default NavBar