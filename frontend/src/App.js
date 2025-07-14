import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component";
import TasksList from "./components/tasks-list.component";
import EditTask from "./components/edit-task.component";
import CreateTask from "./components/create-task.component";
function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Routes>
          <Route path="/" element={<TasksList />} />
          <Route path="/edit/:id" element={<EditTask />} />
          <Route path="/create" element={<CreateTask />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
