import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const brand = "Medical Blog";
  const [open, setOpen] = useState(false);

  return (
    <div className="navBar">
      
      {/* BRAND */}
      <div className="brand">
        <h1>{brand}</h1>
      </div>

      {/* HAMBURGER ICON */}
      <div className="menuIcon" onClick={() => setOpen(!open)}>
        <span className="material-symbols-outlined">
          {open ? "close" : "menu"}
        </span>
      </div>

      {/* LINKS */}
      <div className={`links ${open ? "active" : ""}`}>
        <ul>
          <li>
            <Link to="/">
              <span className="material-symbols-outlined">home</span>
              Home
            </Link>
          </li>

          <li>
            <a href="wwww">
              <span className="material-symbols-outlined">news</span>
              Blog
            </a>
          </li>

          <li>
            <a href="wwww">
              <span className="material-symbols-outlined">article</span>
              About Us
            </a>
          </li>

          <li>
            <a href="wwww">
              <span className="material-symbols-outlined">work_history</span>
              Jobs
            </a>
          </li>

          <li>
            <a href="wwww">
              <span className="material-symbols-outlined">verified_user</span>
              Verify Licence
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;