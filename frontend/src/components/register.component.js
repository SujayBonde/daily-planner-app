import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState(''); // For password confirmation
  const [error, setError] = useState(''); // To display error messages
  const navigate = useNavigate(); // To redirect the user after registration

  const onSubmit = (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Basic validation
    if (!email || !password || !password2) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== password2) {
      setError('Passwords do not match.');
      return;
    }

    const newUser = {
      email: email,
      password: password,
    };

    // Make the API call to the backend
    axios.post(`${process.env.REACT_APP_API_URL}/users/register`, newUser)
      .then(res => {
        console.log(res.data);
        // On success, redirect to the login page
        navigate('/login');
      })
      .catch(err => {
        // If the backend returns an error (e.g., user already exists)
        if (err.response && err.response.data.msg) {
          setError(err.response.data.msg);
        } else {
          setError('Something went wrong. Please try again.');
        }
        console.error(err);
      });
  };

  return (
    <div className="auth-container">
      <div className="auth-form-container">
        <h3>Create Your Account</h3>
        <p className="auth-subtext">Get started with your own personal planner</p>

        {/* Display error messages here */}
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
              minLength="6" // Optional: enforce a minimum password length
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
              minLength="6"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Sign Up
          </button>
        </form>
        <p className="auth-switch-text">
          Already have an account? <a href="/login">Sign In</a>
        </p>
      </div>
    </div>
  );
};

export default Register;