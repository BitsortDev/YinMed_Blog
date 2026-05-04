import { Link } from "react-router-dom";

const NavBar = () => {
    const   brand = 'Medical Blog';

    return ( 
        <div className="navBar">
            <div className="brand">
                <h1>{brand}</h1>
            </div>
            <div className="links">
                <ul>
                    <li><Link to="/"><span className="material-symbols-outlined">home</span>Home</Link></li>
                    <li><a href="www.home.com"><span className="material-symbols-outlined">news</span>Blog</a></li>
                    <li><a href="www.home.com"><span className="material-symbols-outlined">article_person</span>About Us</a></li>
                    <li><a href="www.home.com"><span className="material-symbols-outlined">work_history</span>Jobs</a></li>
                    <li><a href="www.home.com"><span className="material-symbols-outlined">data_check</span>Verify Licence</a></li>
                </ul>
            </div>
        </div>
     ); 
}
 
export default NavBar;

