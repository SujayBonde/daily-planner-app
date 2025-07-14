import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import the context

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext); // Get the login function from context
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      // Call the login function from the context
      await login(email, password);
      // On success, redirect to the main app dashboard
      navigate('/dashboard'); 
    } catch (err) {
      // If login fails, display an error message
      setError('Invalid email or password. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h3>Welcome Back</h3>
        <p className="auth-subtext">Please sign in to continue</p>
        
        {/* Display error messages if they exist */}
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={onSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Sign In
          </button>
        </form>
        <p className="auth-switch-text">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;