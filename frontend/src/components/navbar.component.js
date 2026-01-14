import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // --- JSX for Different States ---

  // The links shown on the far right when a user is LOGGED IN
  const authLinks = (
    <div className="d-flex align-items-center">
      {/* Hides the email on small screens for a cleaner look */}
      <span className="navbar-text me-3 d-none d-lg-block">
        {user ? user.email : ''}
      </span>
      <button onClick={handleLogout} className="btn-logout mx-3">
        Logout
      </button>
    </div>
  );

  // The links shown on the far right when a user is LOGGED OUT
  const guestLinks = (
    <ul className="navbar-nav">
      <li className="nav-item">
        <NavLink to="/login" className="nav-link">
          Login
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/register" className="nav-link">
          Register
        </NavLink>
      </li>
    </ul>
  );
  
  // The main application navigation links (My Tasks, Create Task)
  const mainNavLinks = (
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
            <NavLink to="/dashboard" className="nav-link">
              My Tasks
            </NavLink>
        </li>
        <li className="nav-item">
            <NavLink to="/create" className="nav-link">
              Create Task
            </NavLink>
        </li>
      </ul>
  );

  // --- Main Component Return ---

  return (
    // We wrap the navbar in a container to align it with the page content
    <div className="container">
      <nav className="navbar navbar-expand-lg">
          <NavLink to={token ? "/dashboard" : "/login"} className="navbar-brand">
              {/* Added a span for better styling control if needed */}
              <span className='px-3'>Daily Planner by Sujay</span>
          </NavLink>
          
          <button 
              className="navbar-toggler" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav" 
              aria-controls="navbarNav" 
              aria-expanded="false" 
              padding-right="20px"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
              {/* Main links are only shown if the user is logged in (token exists) */}
              {token && mainNavLinks}
              
              {/* The auth/guest links are pushed to the far right using ms-auto */}
              <div className="ms-auto">
                {token ? authLinks : guestLinks}
              </div>
          </div>
      </nav>
    </div>
  );
};

export default Navbar;