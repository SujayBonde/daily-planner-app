import React from 'react';
// We use NavLink instead of Link to get the 'active' class automatically
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    // We remove the default bootstrap color classes like "navbar-dark" and "bg-dark"
    // because our custom CSS in index.css is handling the styling.
    <nav className="navbar navbar-expand-lg navbar-light">
      <NavLink to="/" className="navbar-brand">
        <h2 className='px-3'>Daily Planner by Sujay</h2>
      </NavLink>
      <button 
        className="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            {/* 
              The NavLink component checks if the app's path matches the 'to' prop.
              If it does, it automatically adds the 'active' class to the link.
              Our new CSS uses .nav-link.active to highlight the current page link.
            */}
            <NavLink to="/" className="nav-link">
              <button id='btn_mytask'>My Tasks</button>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/create" className="nav-link mx-lg-3">
            <button id='btn_createnew'>Create New</button>
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;