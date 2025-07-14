import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams hook
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const EditTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [completed, setCompleted] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());

  // useParams hook gets the ':id' from the URL
  const { id } = useParams();

  useEffect(() => {
    // Use the 'id' from useParams to fetch the task data
    axios.get(`${process.env.REACT_APP_API_URL}/tasks/` + id)
      .then(response => {
        setTitle(response.data.title);
        setDescription(response.data.description);
        setPriority(response.data.priority);
        setCompleted(response.data.completed);
        setDueDate(new Date(response.data.dueDate));
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [id]); // The effect depends on the 'id'

  const onSubmit = (e) => {
    e.preventDefault();

    const task = {
      title,
      description,
      priority,
      completed,
      dueDate,
    };

    axios.post(`${process.env.REACT_APP_API_URL}/tasks/update/` + id, task)
      .then(res => console.log(res.data));

    window.location = '/'; // Go back to the tasks list after updating
  };

  const onToggleCompleted = () => {
    setCompleted(!completed);
  };

  return (
    <div>
      <h3>Edit Task</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title: </label>
          <input type="text"
            required
            className="form-control"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input type="text"
            className="form-control"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Priority: </label>
          <select
            required
            className="form-control"
            value={priority}
            onChange={e => setPriority(e.target.value)}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div className="form-group">
          <label>Due Date: </label>
          <div>
            <DatePicker
              selected={dueDate}
              onChange={date => setDueDate(date)}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="form-check">
            <input className="form-check-input"
              type="checkbox"
              name="completedCheckbox"
              id="completedCheckbox"
              checked={completed}
              onChange={onToggleCompleted}
            />
            <label className="form-check-label" htmlFor="completedCheckbox">
              Completed
            </label>
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Update Task" className="btn btn-primary" />
        </div>
      </form>
    </div>
  )
};

export default EditTask;