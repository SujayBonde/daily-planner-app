import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import the provider

// Import Stylesheets
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// Import Page Components
import Login from './components/login.component';
import Register from './components/register.component';
import Navbar from './components/navbar.component';
import TasksList from './components/tasks-list.component';
import EditTask from './components/edit-task.component';
import CreateTask from './components/create-task.component';
import ProtectedRoute from './components/protectedRoute.component';

function App() {
  return (
    // 1. AuthProvider wraps the entire app, providing context to all children.
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container">
          <Routes>
            {/* --- Public Routes --- */}
            {/* These routes are accessible to anyone. */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* The root path also defaults to the Login page */}
            <Route path="/" element={<Login />} />


            {/* --- Protected Routes --- */}
            {/* These routes are wrapped by ProtectedRoute. If the user is not
                logged in, they will be automatically redirected to /login. */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <TasksList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute>
                  <EditTask />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreateTask />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;