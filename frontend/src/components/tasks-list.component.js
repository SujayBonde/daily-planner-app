import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

// This is the new Task Card sub-component
const Task = ({ task, deleteTask }) => {
  const priorityClass = `priority-${task.priority}`;
  const cardClass = task.completed ? 'task-card completed' : 'task-card';

  return (
    <div className={cardClass}>
      <div className="task-content">
        <div>
          <p className="task-title">{task.title}</p>
          <p className="task-description">{task.description}</p>
        </div>
      </div>
      <div className="task-meta">
        {/* We can hide the badge since we now have the border color */}
        {/* <span className={`priority-badge ${priorityClass}`}>{task.priority}</span> */}
        {task.dueDate && <span className="due-date">{new Date(task.dueDate).toLocaleDateString()}</span>}
      </div>
      <div className="task-actions">
        <Link to={`/edit/${task._id}`} title="Edit">
          <FontAwesomeIcon icon={faPenToSquare} />
        </Link>
        <a href="#" onClick={() => deleteTask(task._id)} title="Delete">
          <FontAwesomeIcon icon={faTrash} />
        </a>
      </div>
    </div>
  );
};

// Main component to display the list of tasks
const TasksList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/tasks/`)
      .then(response => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const deleteTask = (id) => {
    axios.delete(`${process.env.REACT_APP_API_URL}/tasks/${id}`)
      .then(res => {
        console.log(res.data);
        setTasks(tasks.filter(el => el._id !== id));
      });
  };

  return (
    <div>
      <h3>My Tasks</h3>
      <div className="tasks-container">
        {tasks.map(currenttask => (
          <Task task={currenttask} deleteTask={deleteTask} key={currenttask._id} />
        ))}
      </div>
    </div>
  );
};

export default TasksList;