import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css"; // Styles for the date picker

const CreateTask = () => {
  // State hooks to manage the form inputs
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState(new Date());

  // Function to handle form submission
  const onSubmit = (e) => {
    e.preventDefault(); // Prevent the default HTML form submission behavior

    // Create the task object from the current state
    const task = {
      title,
      description,
      priority,
      dueDate,
    };

    // Use axios to send a POST request to the backend API endpoint
    axios.post(`${process.env.REACT_APP_API_URL}/tasks/add`, task)
      .then(res => {
        console.log(res.data)
        // After successfully creating the task, redirect to the home page
        window.location = '/';
      })
      .catch(err => console.log('Error: ' + err));
  };

  return (
    <div>
      <h3>Create New Task</h3>
      
      {/* This container applies our new form styling from index.css */}
      <div className="form-container">
        <form onSubmit={onSubmit}>
          
          <div className="form-group mb-3">
            <label className="form-label">Title</label>
            <input  
                type="text"
                required
                className="form-control"
                value={title}
                onChange={e => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Description (Optional)</label>
            <input 
                type="text"
                className="form-control"
                value={description}
                onChange={e => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group mb-3">
            <label className="form-label">Priority</label>
            <select
                required
                className="form-select"
                value={priority}
                onChange={e => setPriority(e.target.value)}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
            </select>
          </div>

          <div className="form-group mb-4">
            <label className="form-label d-block">Due Date</label>
            <DatePicker
              selected={dueDate}
              onChange={date => setDueDate(date)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <input type="submit" value="Create Task" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;